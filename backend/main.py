from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
import torch
import io
import os

from dotenv import load_dotenv

from huggingface_hub import InferenceClient

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

client = InferenceClient(
    api_key=HF_TOKEN
)
# --------------------------------------------------
# FastAPI
# --------------------------------------------------

app = FastAPI(
    title="AI Image Caption Generator",
    description="Image captioning backend using BLIP + Hugging Face LLM",
    version="1.0"
)
app.add_middleware(
    CORSMiddleware, 
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Load BLIP
# --------------------------------------------------

MODEL_NAME = "Salesforce/blip-image-captioning-base"

print("Loading BLIP model...")

processor = BlipProcessor.from_pretrained(MODEL_NAME)

model = BlipForConditionalGeneration.from_pretrained(
    MODEL_NAME
)

device = "cuda" if torch.cuda.is_available() else "cpu"

model.to(device)

print("BLIP model loaded!")
print("Using device : ",device)


# --------------------------------------------------
# Home endpoint
# --------------------------------------------------

@app.get("/")
def home():

    return {
        "message": "AI Image Caption Generator API is running"
    }


# --------------------------------------------------
# Image Caption Endpoint
# --------------------------------------------------

@app.post("/generate-caption")
async def generate_caption(
    file: UploadFile = File(...)
):
    
    # Read uploaded image
    image_data = await file.read()

    image = Image.open(
        io.BytesIO(image_data)
    ).convert("RGB")

    # Process image with BLIP
    inputs = processor(
        image,
        return_tensors="pt"
    )

    # Move tensors to GPU/CPU
    inputs = {
        key: value.to(device)
        for key, value in inputs.items()
    }

    # Generate caption

    with torch.no_grad():

        output = model.generate(
            **inputs,
            max_new_tokens=50
        )

    # Convert tokens to text
    raw_caption = processor.decode(
        output[0],
        skip_special_tokens=True
    )
    prompt = f"""
    You are an AI image caption editor.

    Improve this image caption:

    "{raw_caption}"

    Make it:
    - Natural
    - Clear
    - Grammatically correct
    - Concise
    - Descriptive

    Do not invent details that are not present in the original caption.

    Return ONLY the improved caption.
    """

    completion = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        max_tokens=100
    )

    print("HF RESPONSE : ")
    print(completion)

    final_caption = completion.choices[0].message.content
    if not final_caption:
        final_caption = raw_caption


    # Return response
    return {
        "filename": file.filename,
        "raw_caption": raw_caption,
        "caption": final_caption,
    }