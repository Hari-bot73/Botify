import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class AIModel:
    def __init__(self):
        self.api_key = os.getenv("MISTRAL_API_KEY")  # Get API key from .env file
        self.api_url = "https://api.mistral.ai/v1/chat/completions"

    def generate_response(self, prompt: str) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "mistral-medium",  # You can use "mistral-tiny" for faster responses
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        }

        try:
            response = requests.post(self.api_url, json=data, headers=headers)
            response_data = response.json()
            
            # Debugging: Print API response
            print("Mistral Response:", response_data)

            if "choices" in response_data and response_data["choices"]:
                return response_data["choices"][0]["message"]["content"]
            elif "error" in response_data:
                return f"API Error: {response_data['error']}"
            else:
                return "Unexpected API response format"
        except requests.exceptions.RequestException as e:
            return f"Request Error: {str(e)}"
        except Exception as e:
            return f"General Error: {str(e)}"

# Create AI model instance
ai_model = AIModel()
