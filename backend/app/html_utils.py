import requests
import logging
from bs4 import BeautifulSoup
from .config import HYPERBROWSER_API_KEY

def fetch_html_hyperbrowser(url):
    try:
        response = requests.post(
            "https://api.hyperbrowser.dev/browser/scrape",
            headers={"Authorization": f"Bearer {HYPERBROWSER_API_KEY}"},
            json={"url": url, "actions": ["waitForLoad", "getHtml"]}
        )
        response.raise_for_status()
        return response.json().get("html")
    except Exception as e:
        logging.error(f"HyperBrowser fetch failed: {e}")
        return None

def fetch_raw_html(url):
    try:
        static_response = requests.get(url, timeout=10)
        static_response.raise_for_status()
        raw_html = static_response.text
    except Exception as static_err:
        logging.warning(f"Static fetch failed: {static_err}")
        raw_html = None

    if not raw_html or "<html" not in (raw_html or "").lower():
        raw_html = fetch_html_hyperbrowser(url)
    return raw_html

def clean_html(raw_html):
    soup = BeautifulSoup(raw_html, "html.parser")
    for tag in soup(["script", "style", "footer", "noscript", "meta", "link"]):
        tag.decompose()
    cleaned_html = soup.prettify()
    if len(cleaned_html) > 8000:
        cleaned_html = cleaned_html[:8000]
    return cleaned_html