from fastapi import FastAPI
from app.api.endpoints import router as api_router

app = FastAPI(title="T-Education AI Finance")

# Обработчик для главной страницы, чтобы не было ошибки 404
@app.get("/")
async def root():
    return {"message": "AI сервис запущен! Перейдите на /docs для тестирования."}

app.include_router(api_router, prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    # 127.0.0.1 — это localhost, безопасный внутренний адрес
    uvicorn.run(app, host="127.0.0.1", port=8113)