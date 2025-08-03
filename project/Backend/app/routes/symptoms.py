from fastapi import APIRouter, Request
from typing import List, Optional
from datetime import date
import uuid

router = APIRouter(
    prefix="/symptoms",
    tags=["Symptoms"]
)

# Temporary in-memory storage (you can replace with MongoDB later)
SYMPTOM_DATA = []

@router.post("/")
async def create_symptom(request: Request):
    data = await request.json()
    symptom_entry = {
        "id": str(uuid.uuid4()),
        "user_id": data.get("user_id"),
        "symptom": data.get("symptom"),
        "date_reported": data.get("date_reported"),  # expects string in YYYY-MM-DD format
        "notes": data.get("notes", "")
    }
    SYMPTOM_DATA.append(symptom_entry)
    return {"message": "Symptom recorded", "data": symptom_entry}

@router.get("/")
async def get_symptoms(user_id: Optional[str] = None):
    if user_id:
        filtered = [s for s in SYMPTOM_DATA if s["user_id"] == user_id]
        return {"symptoms": filtered}
    return {"symptoms": SYMPTOM_DATA}
