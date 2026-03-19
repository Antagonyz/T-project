import pandas as pd
import numpy as np
import random

def generate_student_data(n_samples=2000):
    data = []
    for _ in range(n_samples):
        balance = random.randint(5000, 50000)
        avg_spend = random.randint(300, 800)
        history_len = random.randint(5, 50) # Кол-во транзакций
        dummy1 = 0 
        dummy2 = 0
        
        # Цель: сколько потратит завтра (зависит от баланса и среднего чека)
        target_spend = avg_spend + (balance * 0.02) + random.randint(-100, 500)
        
        data.append([balance, avg_spend, history_len, dummy1, dummy2, target_spend])
    
    columns = ['balance', 'avg_spend', 'history_len', 'dummy1', 'dummy2', 'target_spend']
    df = pd.DataFrame(data, columns=columns)
    df.to_csv('data/student_history.csv', index=False)
    print("Новый датасет (5 фичей) создан!")

if __name__ == "__main__":
    generate_student_data()