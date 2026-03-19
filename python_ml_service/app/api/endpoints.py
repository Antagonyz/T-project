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
    # Собираем данные для нейронки (5 параметров)
    amounts = [abs(t.amount) for t in data.history]
    avg_spend = np.mean(amounts) if amounts else 0
    
    # [Баланс, Средний чек, Кол-во транзакций, 0, 0]
    features = [float(data.current_balance), float(avg_spend), float(len(data.history)), 0.0, 0.0]
    
    # Получаем прогноз от нейронки
    prediction = ml_service.predict_expenses(features)
    
    # Данные для круговой диаграммы
    chart_data = prepare_chart_data(data.history)
    
    return {
        "forecast_balance": round(data.current_balance - prediction, 2),
        "recommendation": ml_service.get_recommendation(prediction, data.current_balance),
        "chart_data": chart_data
    }