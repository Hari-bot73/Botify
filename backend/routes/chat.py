from fastapi import APIRouter
from pydantic import BaseModel
from models.model import ai_model

chat_router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@chat_router.post("/chat")
def chat_endpoint(req: ChatRequest):
    reply = ai_model.generate_response(req.message)
    return {"response": reply}
