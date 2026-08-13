# 8 Generative AI Projects (Open-Source, Local, HuggingFace/PyTorch)

All projects run **locally** using open-source models from Hugging Face — no API keys needed.
GPU (CUDA) is recommended but most will run on CPU (slower). Notes on this are in each script.

## Setup

```bash
python -m venv genai_env
source genai_env/bin/activate      # Windows: genai_env\Scripts\activate
pip install -r requirements.txt
```

First run of each script will download the model weights (a few hundred MB to a few GB
depending on the project) — this only happens once, then they're cached locally
(`~/.cache/huggingface`).

## Projects

| # | File | What it does | Core library |
|---|------|---------------|---------------|
| 1 | `01_text_generation_gpt2.py` | Auto-completes/generates text from a prompt | `transformers` (GPT-2) |
| 2 | `02_text_summarization_bart.py` | Condenses long text into a summary | `transformers` (BART) |
| 3 | `03_image_generation_stable_diffusion.py` | Generates an image from a text prompt | `diffusers` (Stable Diffusion) |
| 4 | `04_image_captioning_blip.py` | Generates a caption describing an image | `transformers` (BLIP) |
| 5 | `05_chatbot_dialogpt.py` | Multi-turn conversational chatbot | `transformers` (DialoGPT) |
| 6 | `06_rag_qa_system.py` | Answers questions using your own documents (RAG) | `sentence-transformers` + `faiss` + FLAN-T5 |
| 7 | `07_gan_mnist.py` | Trains a GAN from scratch to generate digit images | `torch`, `torchvision` (DCGAN) |
| 8 | `08_text_to_speech_speecht5.py` | Converts text into spoken audio | `transformers` (SpeechT5) |

## Recommended order

Start with **1 → 2 → 4** (simplest, fastest, CPU-friendly), then **5 → 6** (more logic),
then **3 → 8** (heavier downloads/compute), and finish with **7** (trains a model from
scratch — most educational, but takes the longest).

## Common issues

- **"CUDA out of memory"** — switch `device` to `"cpu"` in the script, or use a smaller
  model variant (noted in comments where relevant).
- **Slow on CPU** — expected for Stable Diffusion (project 3) and SpeechT5 (project 8);
  everything else runs fine on a laptop CPU.
- **`ModuleNotFoundError`** — make sure your venv is activated and
  `pip install -r requirements.txt` completed without errors.
