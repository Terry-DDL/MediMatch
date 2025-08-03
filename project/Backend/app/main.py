from fastapi import FastAPI
from routes import medicine  # 👈 Make sure this is the file where your router is defined
from database import test_connection  # 👈 Async MongoDB test connection
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="MediMatch API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=[""],
    allow_headers=[""],
)

# Include the medicine routes
app.include_router(medicine.router, prefix="/api")

#Run database connection test at startup
@app.on_event("startup")
async def startup_event():
    await test_connection()
    print("✅ Application started")

#Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to MediMatch API"}