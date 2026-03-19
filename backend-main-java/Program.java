import classes.GetQueries;
import entities.User;
import entities.Card;
import entities.CardTransaction;
import entities.Saving;
import entities.SavingTransaction;
import entities.Goal;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;

public class Program {
  public static void main(String[] args) {
    GetQueries queries = GetQueries.getInstance();

    if (!queries.isConnected()) {
      System.out.println("❌ Нет подключения к БД");
      return;
    }

    // Тест для пользователя с ID = 2 (Иван Петров)
    System.out.println("\n" + "=".repeat(60));
    System.out.println("🔍 ТЕСТ 1: Пользователь ID = 2 (Иван Петров)");
    System.out.println("=".repeat(60));

    User user2 = queries.getUser(2);
    if (user2 != null) {
      printUserDetails(user2, queries);
    }

    // Тест для пользователя с ID = 3 (Анна Смирнова)
    System.out.println("\n" + "=".repeat(60));
    System.out.println("🔍 ТЕСТ 2: Пользователь ID = 3 (Анна Смирнова)");
    System.out.println("=".repeat(60));

    User user3 = queries.getUser(3);
    if (user3 != null) {
      printUserDetails(user3, queries);
    }

    // Тест для несуществующего пользователя
    System.out.println("\n" + "=".repeat(60));
    System.out.println("🔍 ТЕСТ 3: Несуществующий пользователь ID = 99");
    System.out.println("=".repeat(60));

    User user99 = queries.getUser(99);
    if (user99 == null) {
      System.out.println("✅ Корректная обработка: пользователь не найден");
    }

    queries.closeConnection();
  }

  private static void printUserDetails(User user, GetQueries queries) {
    System.out.println("\n👤 Имя: " + user.getFullName());

    // Карты
    printCards(user, queries);

    // Цели
    printGoals(user);

    // Сбережения (ТЕПЕРЬ С ТРАНЗАКЦИЯМИ!)
    printSavings(user, queries);

    // Полная статистика
    printStatistics(user, queries);
  }

  private static void printCards(User user, GetQueries queries) {
    System.out.println("\n💳 КАРТЫ:");
    Map<Integer, Card> cards = user.getCards();

    if (cards.isEmpty()) {
      System.out.println("   Нет карт");
      return;
    }

    // Информация по каждой карте
    cards.forEach((id, card) -> {
      System.out.printf("   [ID: %d] %s | Баланс: %,.2f ₽ | Тип: %s | Активна: %s%n",
          id,
          card.getSerialNumber(),
          card.getBalance(),
          card.getType(),
          card.getIsActive() ? "✅" : "❌");
    });

    // Общий баланс
    BigDecimal totalBalance = cards.values().stream()
        .map(Card::getBalance)
        .reduce(BigDecimal.ZERO, BigDecimal::add);
    System.out.printf("   💰 Общий баланс: %,.2f ₽%n", totalBalance);

    // Транзакции по первой карте (для примера)
    if (!cards.isEmpty()) {
      Card firstCard = cards.values().iterator().next();
      printCardTransactions(queries, firstCard.getId());
    }
  }

  private static void printCardTransactions(GetQueries queries, int cardId) {
    List<CardTransaction> transactions = queries.getCardTransactions(cardId);

    if (transactions.isEmpty()) {
      System.out.println("   📭 Нет транзакций по этой карте");
      return;
    }

    System.out.println("\n   📊 ПОСЛЕДНИЕ ТРАНЗАКЦИИ ПО КАРТЕ:");
    transactions.stream().limit(3).forEach(t -> {
      String typeStr = t.isIncome() ? "💰 Доход" : "💸 Расход";
      System.out.printf("      %s: %,.2f %s - %s (%s)%n",
          typeStr,
          t.getAmount(),
          t.getCurrency(),
          t.getMerchantName(),
          t.getMerchantCategory());
    });
  }

  private static void printGoals(User user) {
    System.out.println("\n🎯 ЦЕЛИ:");
    Map<Integer, Goal> goals = user.getGoals();

    if (goals.isEmpty()) {
      System.out.println("   Нет целей");
      return;
    }

    goals.forEach((id, goal) -> {
      System.out.printf("   [ID: %d] %s | Статус: %s | Дедлайн: %s%n",
          id,
          goal.getTitle(),
          goal.getStatus(),
          goal.getDeadline() != null ? goal.getDeadline() : "бессрочно");
      System.out.printf("       📝 %s%n", goal.getDescription());
    });
  }

  private static void printSavings(User user, GetQueries queries) {
    System.out.println("\n💰 СБЕРЕЖЕНИЯ:");
    Map<Integer, Saving> savings = user.getSavings();

    if (savings.isEmpty()) {
      System.out.println("   Нет сбережений");
      return;
    }

    BigDecimal totalCurrent = BigDecimal.ZERO;
    BigDecimal totalTarget = BigDecimal.ZERO;

    for (Saving saving : savings.values()) {
      // Основная информация о сбережении
      printSavingInfo(saving);

      // ТРАНЗАКЦИИ ПО СБЕРЕЖЕНИЮ!
      printSavingTransactions(queries, saving.getId());

      totalCurrent = totalCurrent.add(saving.getCurrentAmount());
      totalTarget = totalTarget.add(saving.getTargetAmount());
    }

    // Общий прогресс по всем сбережениям
    printOverallSavingsProgress(totalCurrent, totalTarget);
  }

  private static void printSavingInfo(Saving saving) {
    double progress = calculateProgress(saving);
    String progressBar = getProgressBar(progress);

    System.out.printf("   [ID: %d] %s%n", saving.getId(), saving.getTitle());
    System.out.printf("       Текущий: %,.2f %s | Цель: %,.2f %s%n",
        saving.getCurrentAmount(),
        saving.getCurrency(),
        saving.getTargetAmount(),
        saving.getCurrency());
    System.out.printf("       Прогресс: %s %.1f%%%n", progressBar, progress);

    if (saving.getClosesGoal() != null) {
      System.out.printf("       🎯 Связана с целью: %s (ID: %d)%n",
          saving.getClosesGoal().getTitle(),
          saving.getClosesGoal().getId());
    }
  }

  private static void printSavingTransactions(GetQueries queries, int savingId) {
    List<SavingTransaction> transactions = queries.getSavingTransactions(savingId);

    if (transactions.isEmpty()) {
      System.out.println("       📭 Нет транзакций пополнения");
      return;
    }

    System.out.println("       📊 ИСТОРИЯ ПОПОЛНЕНИЙ:");
    transactions.stream().limit(3).forEach(t -> {
      String typeStr = t.isIncome() ? "➕ Пополнение" : "➖ Списание";
      System.out.printf("          %s: %,.2f %s (%s)%n",
          typeStr,
          t.getAmount(),
          t.getCurrency(),
          t.getDate() != null ? t.getDate().toString().substring(0, 10) : "неизвестно");
    });

    if (transactions.size() > 3) {
      System.out.printf("          ... и еще %d транзакций%n", transactions.size() - 3);
    }
  }

  private static void printOverallSavingsProgress(BigDecimal totalCurrent, BigDecimal totalTarget) {
    double overallProgress = calculateOverallProgress(totalCurrent, totalTarget);
    System.out.printf("   📊 ОБЩИЙ ПРОГРЕСС: %,.2f / %,.2f ₽ (%.1f%%)%n",
        totalCurrent, totalTarget, overallProgress);
  }

  private static void printStatistics(User user, GetQueries queries) {
    GetQueries.UserStatistics stats = queries.getUserStatistics(user.getId());
    if (stats != null) {
      System.out.println("\n📊 СТАТИСТИКА:");
      System.out.println(stats);
    }
  }

  private static double calculateProgress(Saving saving) {
    if (saving.getTargetAmount().compareTo(BigDecimal.ZERO) == 0) {
      return 0.0;
    }
    return saving.getCurrentAmount()
        .divide(saving.getTargetAmount(), 4, RoundingMode.HALF_UP)
        .multiply(new BigDecimal("100"))
        .doubleValue();
  }

  private static double calculateOverallProgress(BigDecimal current, BigDecimal target) {
    if (target.compareTo(BigDecimal.ZERO) == 0) {
      return 0.0;
    }
    return current.divide(target, 4, RoundingMode.HALF_UP)
        .multiply(new BigDecimal("100"))
        .doubleValue();
  }

  private static String getProgressBar(double progress) {
    int barLength = 20;
    int filled = (int) (progress / 100 * barLength);
    filled = Math.min(filled, barLength); // Защита от переполнения

    StringBuilder bar = new StringBuilder("[");
    for (int i = 0; i < barLength; i++) {
      bar.append(i < filled ? "█" : "░");
    }
    bar.append("]");
    return bar.toString();
  }
}