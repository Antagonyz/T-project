import apiClient from "./client"; // Тот самый клиент с базовым URL

export const FinanceService = {
  // 1. Получение данных для главной (баланс + график от нейронки)
  getDashboard: async () => {
    const response = await apiClient.get("/dashboard");
    return response.data;
  },

  // 2. Получение транзакций для экрана Бюджет
  getTransactions: async () => {
    const response = await apiClient.get("/transactions");
    return response.data;
  },

  // 3. Обновление статуса задачи (чекбокс на экране Цели)
  toggleTaskStatus: async (taskId: string, isCompleted: boolean) => {
    const response = await apiClient.patch(`/tasks/${taskId}`, { isCompleted });
    return response.data;
  },

  // 4. Получение списка копилок
  getSavings: async () => {
    const response = await apiClient.get("/savings");
    return response.data;
  },
};
