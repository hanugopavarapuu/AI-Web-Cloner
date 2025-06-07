import os
import re
import requests
import logging
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import cohere

from .html_utils import fetch_raw_html, clean_html
from .ai_clone import generate_ai_html

load_dotenv()
co = cohere.Client(os.getenv("CO_API_KEY"))
HYPERBROWSER_API_KEY = os.getenv("HYPERBROWSER_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

class CloneRequest(BaseModel):
    url: str

@app.get("/")
def home():
    return {"message": "Cohere Cloner with HyperBrowser is running!"}

@app.post("/clone/ai")
def clone_with_ai(request: CloneRequest):
    try:
        raw_html = fetch_raw_html(request.url)
        if not raw_html:
            return {"status": "error", "message": "Failed to fetch HTML from both sources."}
        cleaned_html = clean_html(raw_html)
        result_html = generate_ai_html(cleaned_html)
        return {
            "status": "success",
            "html": result_html
        }
    except Exception as e:
        logging.exception("Clone AI error")
        return {"status": "error", "message": str(e)}
