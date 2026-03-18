import torch
import numpy as np
from app.models.budget_model import BudgetNet

class MLService:
    def __init__(self):
        # В реальности здесь загрузка сохраненных весов: model.load_state_dict(...)
        self.model = BudgetNet(input_size=5, hidden_size=16, output_size=1)
        self.model.eval()

    def predict_expenses(self, features: list):
        # Превращаем список признаков в тензор
        input_tensor = torch.FloatTensor([features])
        with torch.no_grad():
            prediction = self.model(input_tensor)
        return prediction.item()

    def get_recommendation(self, predicted_balance, current_balance):
        if predicted_balance < current_balance * 0.1:
            return "Опасно! Расходы превышают лимит. Перейдите в Т-Банк для настройки лимитов."
        return "Ваш финансовый план в норме."