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
                    │      User           │
                    │   Uploads Image     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │ HTML + CSS + JS     │
                    └──────────┬──────────┘
                               │
                         HTTP POST Request
                               │
                               ▼
                    ┌─────────────────────┐
                    │     FastAPI         │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       BLIP          │
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
                    │ Display Result      │
                    └─────────────────────┘


## PROJECT STRUCTURE

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
