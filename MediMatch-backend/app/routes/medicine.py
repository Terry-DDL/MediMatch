from datetime import date, datetime
import uuid

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from bson import ObjectId
from database import db  # Your Motor async MongoDB client

router = APIRouter()

# ========================
# Pydantic Data Models
# ========================
class MedicineModel(BaseModel):
    user_id: int
    med_name: str
    dosage: str
    frequency: str
    start_date: date

class MedicineUpdated(BaseModel):
    med_name: str  # Now includes name in updates
    dosage: str
    frequency: str
    start_date: date

# ========================
# Utility Functions
# ========================
def fix_object_ids(document: dict):
    """Convert ObjectId to string for JSON serialization"""
    document = document.copy()
    if "_id" in document and isinstance(document["_id"], ObjectId):
        document["_id"] = str(document["_id"])
    return document

# ========================
# POST: Add new medication
# ========================
@router.post("/medications/")
async def add_medicine(medicine: MedicineModel):
    medication_dict = medicine.dict()
    medication_dict["med_id"] = str(uuid.uuid4())  # Generate unique med_id
    medication_dict["start_date"] = datetime.combine(medication_dict["start_date"], datetime.min.time())

    # Check if medication with same name already exists for user (case insensitive)
    existing = await db.medications.find_one({
        "user_id": medication_dict["user_id"],
        "med_name": {"$regex": f"^{medication_dict['med_name']}$", "$options": "i"}
    })
    if existing:
        raise HTTPException(
            status_code=400,
            detail="This medication already exists for the user."
        )

    try:
        result = await db.medications.insert_one(medication_dict)
        inserted_doc = await db.medications.find_one({"_id": result.inserted_id})
        return {
            "message": "Medication added successfully",
            "data": fix_object_ids(inserted_doc)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add medication: {str(e)}")

# ========================
# PUT: Update medication
# ========================
@router.put("/medications/{med_id}")
async def update_medicine(med_id: str, update: MedicineUpdated):
    update_query = {
        "$set": {
            "med_name": update.med_name,
            "dosage": update.dosage,
            "frequency": update.frequency,
            "start_date": datetime.combine(update.start_date, datetime.min.time())
        }
    }

    result = await db.medications.update_one({"med_id": med_id}, update_query)

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Medication not found.")

    updated_doc = await db.medications.find_one({"med_id": med_id})
    return {
        "message": "Medication updated successfully",
        "updated_medication": fix_object_ids(updated_doc)
    }

# ========================
# DELETE: Remove medication
# ========================
@router.delete("/medications/{med_id}")
async def remove_medicine(med_id: str):
    result = await db.medications.delete_one({"med_id": med_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Medication not found.")

    return {"message": "Medication removed successfully"}

# ========================================
# GET: Get all medications for a user
# ========================================
@router.get("/medications/user/{user_id}")
async def get_medicines_by_user(user_id: int):
    meds_cursor = db.medications.find({"user_id": user_id})
    meds = []
    async for med in meds_cursor:
        meds.append(fix_object_ids(med))

    if not meds:
        raise HTTPException(status_code=404, detail="No medications found for this user.")

    return {
        "user_id": user_id,
        "medications": meds
    }

# ========================================
# GET: Get medication by med_id
# ========================================
@router.get("/medications/{med_id}")
async def get_med_by_id(med_id: str):
    med = await db.medications.find_one({"med_id": med_id})
    if not med:
        raise HTTPException(status_code=404, detail="Medication not found.")
    # Wrap the single medication inside a "medications" array for frontend compatibility
    return {
        "medications": [fix_object_ids(med)]
    }
