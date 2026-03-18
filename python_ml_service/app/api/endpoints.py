from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import numpy as np
from app.services.ml_service import MLService
from app.utils.analytics import prepare_chart_data

router = APIRouter()
ml_service = MLService()

class Transaction(BaseModel):
    amount: float
    category: str

class AnalysisRequest(BaseModel):
    current_balance: float
    history: List[Transaction]

@router.post("/analyze")
async def analyze_finance(data: AnalysisRequest):
    # 1. Готовим фичи для нейронки 
    avg_spend = np.mean([t.amount for t in data.history]) if data.history else 0
    features = [data.current_balance, avg_spend, len(data.history), 0, 0] # Заглушка
    
    # 2. Получаем прогноз
    prediction = ml_service.predict_expenses(features)
    
    # 3. Готовим данные для графиков
    chart_data = prepare_chart_data(data.history)
    
    return {
        "forecast_balance": round(data.current_balance - prediction, 2),
        "recommendation": ml_service.get_recommendation(prediction, data.current_balance),
        "chart_data": chart_data
    }