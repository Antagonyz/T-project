// Тип для Карты
export type BankCard = {
  id: string;
  maskedNumber: string; // "** 1234"
  balance: number;
  type: "visa" | "mastercard" | "mir";
};

// Тип для Операции (Истории)
export type Transaction = {
  id: string;
  title: string; // "Текст истории"
  category: string; // "Категория накопления"
  amount: number; // 100
  date: string; // ISO string
  type: "expense" | "income" | "savings_transfer";
};

// Тип для Цели / Накопления
export type SavingsGoal = {
  id: string;
  title: string;
  deadline: string; // "11.09.26"
  targetAmount: number; // 100000
  savedAmount: number; // 15000
  tasks?: GoalTask[]; // Список задач для страницы Целей
};

export type GoalTask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

// Модель для Дашборда
export type UserDashboard = {
  totalBalance: number;
  cards: BankCard[];
  mainGoal?: SavingsGoal;
  prioritySavings?: SavingsGoal;
  forecastData?: any; // Сюда пойдет JSON от нейронки
};
