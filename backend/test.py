import os
from dotenv import load_dotenv
from config import MISTRAL_API_KEY  # Ensure config.py exists and loads environment variables

load_dotenv()  # Load environment variables from .env

print("API Key:", MISTRAL_API_KEY)  # Check if API key is loaded correctly
