from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from collections import defaultdict
import os

from .database import Base, engine, SessionLocal
from . import models, schemas, crud

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Emotion-driven Accounting")

# CORS configuration - allow frontend origins
# In production, set ALLOWED_ORIGINS environment variable
allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/expenses", response_model=schemas.ExpenseOut)
def add_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    return crud.create_expense(db, expense)

@app.get("/expenses", response_model=list[schemas.ExpenseOut])
def list_expenses(db: Session = Depends(get_db)):
    return crud.get_expenses(db)

@app.get("/analytics/emotions")
def emotion_analytics(db: Session = Depends(get_db)):
    expenses = crud.get_expenses(db)
    stats = defaultdict(lambda: {"count": 0, "total": 0})

    for e in expenses:
        stats[e.emotion]["count"] += 1
        stats[e.emotion]["total"] += e.amount

    return stats