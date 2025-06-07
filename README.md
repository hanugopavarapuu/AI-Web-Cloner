# Orchids Challenge

A fullstack project with a Python FastAPI backend and a Next.js frontend (React).

---

## Project Structure
```
orchids-challenge/
  backend/
    app/
      main.py
  frontend/
    package.json
    src/
      pages/
        index.tsx
```

---

## API Keys

This project uses the following API keys:

- **CO_API_KEY**: Your Cohere API key for AI HTML generation.
- **HYPERBROWSER_API_KEY**: Your HyperBrowser API key for advanced HTML scraping.

**How to set up:**

1. Create a `.env` file in `backend/app/` with the following content:
    ```
    CO_API_KEY=your-cohere-api-key-here
    HYPERBROWSER_API_KEY=your-hyperbrowser-api-key-here
    ```
2. These keys are loaded automatically by the backend using `dotenv` and are required for the `/clone/ai` endpoint to function.

**Note:**  
Do not commit your `.env` file or API keys to version control.

---

## Backend

- **Framework:** FastAPI (Python)
- **Entry Point:** `backend/app/main.py`
- **How to run:**
  ```bash
  cd backend
  uvicorn app.main:app --reload (or)
  python3 -m uvicorn app.main:app --reload
  ```

---

## Frontend

- **Framework:** Next.js (React)
- **Entry Point:** `frontend/src/pages/index.tsx`
- **Styling:** All styles are inline in the React component (no CSS files, no Tailwind, no Chakra, etc.)
- **How to run:**
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- **Access:** Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Features

- Paste a website URL and click "Generate Clone" to clone the site using the backend AI.
- Supports dark mode toggle.
- All frontend styling is done with inline React styles for simplicity.

---

## Architecture

This project follows a **monolithic MVC (Model-View-Controller) structure**:

- **Backend (FastAPI):**
  - **Model:** Data models and configuration (`config.py`, Pydantic models)
  - **View:** API responses (JSON)
  - **Controller:** Route logic and orchestration (`main.py`, `html_utils.py`, `ai_clone.py`)
- **Frontend (Next.js):**
  - **View:** React components (UI)
  - **Controller:** Component logic and state management
  - **Model:** Data passed between components and fetched from the backend

---

## Notes

- Make sure the backend is running before using the frontend.
- The frontend expects the backend to be available at `http://127.0.0.1:8000`.

---
