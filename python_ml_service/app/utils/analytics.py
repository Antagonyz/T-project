def prepare_chart_data(transactions):
    # Группируем траты по категориям для Pie Chart
    data = {}
    for t in transactions:
        data[t.category] = data.get(t.category, 0) + abs(t.amount)
    
    # Формат для фронтенда: [{"name": "Еда", "value": 500}, ...]
    return [{"name": k, "value": v} for k, v in data.items()]