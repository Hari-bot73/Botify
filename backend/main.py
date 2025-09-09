from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chat import chat_router

app = FastAPI(title="AI Assistant API", version="1.0")

# ✅ CORS so frontend (React) can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routes
app.include_router(chat_router)

@app.get("/")
def read_root():
    return {"message": "AI Assistant API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8080, reload=True)  # ✅ Backend on 8080
