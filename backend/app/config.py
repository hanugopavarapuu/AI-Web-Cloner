import os
from dotenv import load_dotenv

load_dotenv()

CO_API_KEY = os.getenv("CO_API_KEY")
HYPERBROWSER_API_KEY = os.getenv("HYPERBROWSER_API_KEY")
