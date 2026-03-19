import torch
import torch.nn as nn
import pandas as pd
from app.models.budget_model import BudgetNet

# 1. Загрузка данных (берем первые 5 колонок как вход)
df = pd.read_csv('data/student_history.csv')
X = torch.tensor(df.iloc[:, :5].values, dtype=torch.float32)
y = torch.tensor(df[['target_spend']].values, dtype=torch.float32)

# 2. Инициализация (input_size=5)
model = BudgetNet(input_size=5, hidden_size=16, output_size=1)
criterion = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

# 3. Обучение
print(" Обучение модели на 5 параметрах...")
for epoch in range(100):
    optimizer.zero_grad()
    loss = criterion(model(X), y)
    loss.backward()
    optimizer.step()

# 4. Сохранение
torch.save(model.state_dict(), 'app/models/model.pth')
print(" Модель сохранена!")