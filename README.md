# AI Image Caption Generator

An AI-powered image caption generation web application that combines **BLIP (Bootstrapping Language-Image Pre-training)** with a **Hugging Face-hosted Large Language Model** to generate natural, clear, and descriptive captions for uploaded images.

The application uses BLIP to understand the visual content of an image and generate an initial caption. A Hugging Face LLM then improves the caption to make it more natural, grammatically correct, concise, and readable.

---

## 📌 Project Overview

Image captioning is a computer vision and natural language processing task in which an AI system analyzes an image and generates a textual description of its contents.

This project implements a two-stage AI pipeline:

**Image → BLIP → Raw Caption → Hugging Face LLM → Improved Caption**

### How it works

1. The user uploads an image through the web interface.
2. The frontend sends the image to the FastAPI backend.
3. The BLIP image captioning model analyzes the image.
4. BLIP generates a raw image caption.
5. The raw caption is sent to a Hugging Face-hosted LLM.
6. The LLM improves the caption while avoiding unsupported details.
7. The final caption is returned to the frontend and displayed to the user.

---

## ✨ Features

- 🖼️ Upload an image through a web interface
- 🤖 AI-powered image caption generation
- 👁️ BLIP-based image understanding
- ✨ AI-powered caption refinement
- 📝 Natural and grammatically correct captions
- ⚡ FastAPI backend
- 🌐 HTML, CSS and JavaScript frontend
- 🔗 REST API communication between frontend and backend
- 🔐 Hugging Face API authentication using environment variables
- 💻 Runs locally on Windows
- 📚 Interactive API documentation through FastAPI Swagger UI

---

## 🛠️ Technologies Used

### Backend

- **Python**
- **FastAPI**
- **Uvicorn**
- **PyTorch**
- **Transformers**
- **Pillow**
- **Hugging Face Hub**
- **python-dotenv**

### AI Models

#### BLIP

**Model:** `Salesforce/blip-image-captioning-base`

BLIP is responsible for analyzing the uploaded image and generating the initial caption.

#### Hugging Face LLM

**Model:** `openai/gpt-oss-120b`

The LLM receives the raw BLIP caption and improves its clarity, grammar, and naturalness.

### Frontend

- HTML
- CSS
- JavaScript

---

## 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    │    Uploads Image    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │   HTML + CSS + JS   │
                    └──────────┬──────────┘
                               │
                         HTTP POST Request
                               │
                               ▼
                    ┌─────────────────────┐
                    │      FastAPI        │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │        BLIP         │
                    │ Image Caption Model │
                    └──────────┬──────────┘
                               │
                          Raw Caption
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Hugging Face     │
                    │        LLM          │
                    └──────────┬──────────┘
                               │
                        Improved Caption
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │    Display Result   │
                    └─────────────────────┘
```

---

## **Project Structure**

```text
ai-image-caption-generator/
│
├── backend/
│   └── main.py
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── .gitignore
├── README.md
└── requirements.txt
```

---

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SnehaNandy/ai-image-caption-generator.git
```

Navigate to the project directory:

```bash
cd ai-image-caption-generator
```

---

### 2. Create a Virtual Environment

Create a Python virtual environment:

```bash
python -m venv genai_env
```

Activate the virtual environment on Windows:

```bash
genai_env\Scripts\activate
```

---

### 3. Install Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

---

### 4. Configure Hugging Face API Key

Create a `.env` file in the project root directory:

```text
HF_TOKEN=your_huggingface_api_key
```

Replace `your_huggingface_api_key` with your actual Hugging Face API token.

**Important:** Never upload your `.env` file or API key to GitHub.

The `.env` file is excluded from Git using `.gitignore`.

---

## ▶️ Running the Application

### Start the FastAPI Backend

From the project root directory, run:

```bash
uvicorn backend.main:app --reload
```

The backend will start at:

```text
http://127.0.0.1:8000
```

---

### Open the Frontend

Open the `frontend/index.html` file using a local development server such as **VS Code Live Server**.

The frontend communicates with the FastAPI backend through the `/generate-caption` API endpoint.

---

## 📚 API Documentation

FastAPI automatically provides interactive API documentation.

After starting the backend, open:

```text
http://127.0.0.1:8000/docs
```

The Swagger UI allows you to:

- View available API endpoints
- Upload an image
- Test the `/generate-caption` endpoint
- View the generated response
- Inspect the API request and response structure

---

## 🔗 API Endpoint

### Generate Image Caption

**Endpoint:**

```text
POST /generate-caption
```

**Request:**

The endpoint accepts an uploaded image using `multipart/form-data`.

**Response:**

```json
{
  "filename": "example.jpg",
  "raw_caption": "a person holding a flower in their hand",
  "caption": "A person is holding a flower in their hand."
}
```

The `raw_caption` is generated by BLIP, while the `caption` is the improved version generated by the Hugging Face LLM.

---

## 🔄 Processing Pipeline

The application follows this workflow:

```text
User Uploads Image
        ↓
Frontend
        ↓
FastAPI Backend
        ↓
Image Processing with Pillow
        ↓
BLIP Image Captioning Model
        ↓
Raw Caption
        ↓
Hugging Face LLM
        ↓
Improved Caption
        ↓
Frontend Display
```

---

## 🧠 AI Model Responsibilities

### BLIP

BLIP performs the primary image captioning task.

It analyzes the visual information in the uploaded image and generates an initial textual description.

**Model:**

```text
Salesforce/blip-image-captioning-base
```

### Hugging Face LLM

The Hugging Face-hosted LLM receives the raw BLIP caption and improves it by focusing on:

- Natural language
- Grammar
- Clarity
- Conciseness
- Readability

The LLM is instructed not to introduce details that are not supported by the original caption.

**Model:**

```text
openai/gpt-oss-120b
```

---

## 🖥️ User Interface

The web interface allows users to:

1. Upload an image.
2. Preview the selected image.
3. Generate an AI caption.
4. View the generated caption.
5. Copy the generated caption.

---

## 🔐 Security

The Hugging Face API key is stored using an environment variable:

```text
HF_TOKEN
```

Sensitive credentials are not hard-coded into the source code.

The `.env` file is excluded from version control using `.gitignore`.

---

## 🚀 Future Improvements

Possible future improvements include:

- Deploying the backend and frontend online
- Supporting additional image formats
- Adding multilingual caption generation
- Improving caption quality with more advanced vision-language models
- Adding caption history
- Adding downloadable captions
- Adding user authentication
- Improving error handling and loading states

---

## 🎓 Project Purpose

This project was developed as part of a **Generative AI learning/project course** to gain practical experience with:

- Generative AI
- Computer Vision
- Image Captioning
- Large Language Models
- Hugging Face
- FastAPI
- REST APIs
- Frontend and backend integration
- AI model integration using Python

---

## 👥 Team Members

**Project Team:**

- Sneha Nandy
- Rushmi Roy
- Sraddha Saha Roy
- Rajesh Sen
- Sayantani Das
- Sandip Ghosh

---

## 📄 License

This project is intended for educational and academic purposes.
