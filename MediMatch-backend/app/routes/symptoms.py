from fastapi import APIRouter, Request
from typing import List, Optional
from datetime import date
import uuid  # Used to generate unique symptom entry IDs

# Create a router for all symptom-related endpoints
router = APIRouter(
    prefix="/symptoms",    # All routes here will be prefixed with /symptoms
    tags=["Symptoms"]      # For Swagger documentation grouping
)

# Temporary in-memory list to store symptom data
# In production, replace this with a persistent DB (like MongoDB)
SYMPTOM_DATA = []

# POST /symptoms/ → Create a new symptom entry
@router.post("/")
async def create_symptom(request: Request):
    # Parse incoming JSON request body
    data = await request.json()

    # Construct a new symptom entry
    symptom_entry = {
        "id": str(uuid.uuid4()),                      # Generate unique ID
        "user_id": data.get("user_id"),               # ID of the user reporting the symptom
        "symptom": data.get("symptom"),               # Symptom description (e.g., headache)
        "date_reported": data.get("date_reported"),   # Date the symptom occurred (as string YYYY-MM-DD)
        "notes": data.get("notes", "")                # Optional notes field
    }

    # Store the new symptom entry in memory
    SYMPTOM_DATA.append(symptom_entry)

    # Return confirmation and the new entry
    return {"message": "Symptom recorded", "data": symptom_entry}

# GET /symptoms/ → Retrieve all symptoms, or filter by user_id
@router.get("/")
async def get_symptoms(user_id: Optional[str] = None):
    # If user_id is provided, filter symptoms by that user
    if user_id:
        filtered = [s for s in SYMPTOM_DATA if s["user_id"] == user_id]
        return {"symptoms": filtered}

    # Otherwise, return all stored symptoms
    return {"symptoms": SYMPTOM_DATA}
