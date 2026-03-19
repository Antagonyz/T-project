import torch
import os
from app.models.budget_model import BudgetNet

class MLService:
    def __init__(self):
        self.model_path = "app/models/model.pth"
        # Архитектура должна строго соответствовать обученной модели (5 входов)
        self.model = BudgetNet(input_size=5, hidden_size=16, output_size=1)
        
        if os.path.exists(self.model_path):
            self.model.load_state_dict(torch.load(self.model_path))
            print(" Нейронка успешно загрузила веса!")
        
        self.model.eval()

    def predict_expenses(self, features: list):
        input_tensor = torch.FloatTensor([features])
        with torch.no_grad():
            prediction = self.model(input_tensor)
        # Возвращаем либо предсказание, либо 0 (чтобы не было отрицательных трат)
        return max(0, prediction.item())

    def get_recommendation(self, prediction, balance):
        if prediction > balance * 0.5:
            return "Опасно! Прогноз трат слишком высокий. Т-Банк рекомендует отложить часть средств."
        return "Твой бюджет в порядке. Продолжай в том же духе!"