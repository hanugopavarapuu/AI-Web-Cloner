import re
import cohere
from .config import CO_API_KEY

co = cohere.Client(CO_API_KEY)

def generate_ai_html(cleaned_html):
    prompt = f"""
You are an expert frontend developer.

Convert the following raw HTML into a complete, standalone, and responsive HTML document.

✅ Only include useful and visible content in <body>.
✅ Style the page with inline CSS in <style> inside <head>.
✅ Do not include tracking scripts, repeated padding, ads, or markdown formatting.
❌ No explanations. Just return full HTML code.

Raw HTML:
{cleaned_html}
"""
    gen = co.generate(
        model="command-r-plus",
        prompt=prompt,
        max_tokens=1500,
        temperature=0.3,
    )
    ai_html = gen.generations[0].text.strip()
    match = re.search(r"<html.*?</html>", ai_html, re.DOTALL | re.IGNORECASE)
    if match:
        result_html = match.group(0).strip()
    else:
        result_html = re.sub(r"(?s)^.*?```html\\s*", "", ai_html)
        result_html = re.sub(r"```$", "", result_html.strip())
    return result_html