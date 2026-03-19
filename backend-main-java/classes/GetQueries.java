package classes;

import interfaces.IGetQueries;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;
import java.math.RoundingMode;

import entities.Card;
import entities.CardTransaction;
import entities.Goal;
import entities.Saving;
import entities.SavingTransaction;
import entities.User;
import enums.CardType;
import enums.GoalStatus;
import enums.TransactionType;

public class GetQueries implements IGetQueries {
  private final String url = "jdbc:postgresql://localhost:5432/TBankStudent";
  private final String username = "postgres";
  private final String password = "";

  private Connection connection;
  private static GetQueries instance = null;

  public static GetQueries getInstance() {
    if (instance == null) {
      instance = new GetQueries();
    }
    return instance;
  }

  private GetQueries() {
    try {
      Class.forName("org.postgresql.Driver");
      connection = DriverManager.getConnection(url, username, password);
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  @Override
  public User getUser(int id) {
    String userSql = "SELECT full_name FROM users WHERE id = ?";
    String fullName = null;

    try (PreparedStatement stmt = connection.prepareStatement(userSql)) {
      stmt.setInt(1, id);
      try (ResultSet rs = stmt.executeQuery()) {
        if (rs.next()) {
          fullName = rs.getString("full_name");
        } else {
          return null;
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
      return null;
    }

    Map<Integer, Card> cards = getUserCards(id);
    Map<Integer, Goal> goals = getUserGoals(id);
    Map<Integer, Saving> savings = getUserSavings(id);

    return new User(id, fullName, cards, goals, savings);
  }

  @Override
  public Map<Integer, Card> getUserCards(int userId) {
    Map<Integer, Card> cards = new HashMap<>();
    String sql = "SELECT id, serial_number, balance, type, is_active FROM cards WHERE user_id = ?";

    try (PreparedStatement stmt = connection.prepareStatement(sql)) {
      stmt.setInt(1, userId);
      try (ResultSet rs = stmt.executeQuery()) {
        while (rs.next()) {
          int id = rs.getInt("id");
          Card card = new Card(
              id,
              rs.getString("serial_number"),
              rs.getBigDecimal("balance"),
              CardType.valueOf(rs.getString("type")),
              rs.getBoolean("is_active"));
          cards.put(id, card);
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return cards;
  }

  @Override
  public Map<Integer, Goal> getUserGoals(int userId) {
    Map<Integer, Goal> goals = new HashMap<>();
    String sql = "SELECT id, title, description, status, deadline FROM goals WHERE user_id = ?";

    try (PreparedStatement stmt = connection.prepareStatement(sql)) {
      stmt.setInt(1, userId);
      try (ResultSet rs = stmt.executeQuery()) {
        while (rs.next()) {
          int id = rs.getInt("id");
          Goal goal = new Goal(
              id,
              rs.getString("title"),
              rs.getString("description"),
              GoalStatus.valueOf(rs.getString("status")),
              rs.getDate("deadline"));
          goals.put(id, goal);
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return goals;
  }

  @Override
  public Map<Integer, Saving> getUserSavings(int userId) {
    Map<Integer, Saving> savings = new HashMap<>();
    String sql = """
            SELECT s.id, s.title, s.target_amount, s.current_amount, s.currency,
                   s.closes_goal_id,
                   g.id as goal_id, g.title as goal_title, g.description, g.status, g.deadline
            FROM savings s
            LEFT JOIN goals g ON s.closes_goal_id = g.id
            WHERE s.user_id = ?
        """;

    try (PreparedStatement stmt = connection.prepareStatement(sql)) {
      stmt.setInt(1, userId);
      try (ResultSet rs = stmt.executeQuery()) {
        while (rs.next()) {
          int savingId = rs.getInt("id");

          Goal goal = null;
          if (rs.getObject("closes_goal_id") != null) {
            int goalId = rs.getInt("closes_goal_id");
            goal = new Goal(
                goalId,
                rs.getString("goal_title"),
                rs.getString("description"),
                GoalStatus.valueOf(rs.getString("status")),
                rs.getDate("deadline"));
          }

          Saving saving = new Saving(
              savingId,
              rs.getString("title"),
              goal,
              rs.getBigDecimal("target_amount"),
              rs.getBigDecimal("current_amount"),
              rs.getString("currency"));
          savings.put(savingId, saving);
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return savings;
  }

  @Override
  public Card getCardById(int cardId) {
    String sql = "SELECT id, serial_number, balance, type, is_active FROM cards WHERE id = ?";

    try (PreparedStatement stmt = connection.prepareStatement(sql)) {
      stmt.setInt(1, cardId);
      try (ResultSet rs = stmt.executeQuery()) {
        if (rs.next()) {
          return new Card(
              rs.getInt("id"),
              rs.getString("serial_number"),
              rs.getBigDecimal("balance"),
              CardType.valueOf(rs.getString("type")),
              rs.getBoolean("is_active"));
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return null;
  }

  @Override
  public Goal getGoalById(int goalId) {
    String sql = "SELECT id, title, description, status, deadline FROM goals WHERE id = ?";

    try (PreparedStatement stmt = connection.prepareStatement(sql)) {
      stmt.setInt(1, goalId);
      try (ResultSet rs = stmt.executeQuery()) {
        if (rs.next()) {
          return new Goal(
              rs.getInt("id"),
              rs.getString("title"),
              rs.getString("description"),
              GoalStatus.valueOf(rs.getString("status")),
              rs.getDate("deadline"));
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return null;
  }

  @Override
  public Saving getSavingById(int savingId) {
    String sql = """
            SELECT s.id, s.title, s.target_amount, s.current_amount, s.currency,
                   s.closes_goal_id,
                   g.id as goal_id, g.title as goal_title, g.description, g.status, g.deadline
            FROM savings s
            LEFT JOIN goals g ON s.closes_goal_id = g.id
            WHERE s.id = ?
        """;

    try (PreparedStatement stmt = connection.prepareStatement(sql)) {
      stmt.setInt(1, savingId);
      try (ResultSet rs = stmt.executeQuery()) {
        if (rs.next()) {
          Goal goal = null;
          if (rs.getObject("closes_goal_id") != null) {
            goal = new Goal(
                rs.getInt("closes_goal_id"),
                rs.getString("goal_title"),
                rs.getString("description"),
                GoalStatus.valueOf(rs.getString("status")),
                rs.getDate("deadline"));
          }

          return new Saving(
              rs.getInt("id"),
              rs.getString("title"),
              goal,
              rs.getBigDecimal("target_amount"),
              rs.getBigDecimal("current_amount"),
              rs.getString("currency"));
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return null;
  }

  public List<CardTransaction> getCardTransactions(int cardId) {
    List<CardTransaction> transactions = new ArrayList<>();
    String sql = "SELECT id, transaction_type, amount, currency, merchant_name, merchant_category, transaction_date " +
        "FROM card_transactions WHERE card_id = ? ORDER BY transaction_date DESC";

    try (PreparedStatement stmt = connection.prepareStatement(sql)) {
      stmt.setInt(1, cardId);
      try (ResultSet rs = stmt.executeQuery()) {
        while (rs.next()) {
          String typeStr = rs.getString("transaction_type");
          TransactionType type = "INCOME".equals(typeStr) ? TransactionType.INCOME : TransactionType.EXPENSE;

          CardTransaction transaction = new CardTransaction(
              rs.getInt("id"),
              cardId,
              type,
              rs.getBigDecimal("amount"),
              rs.getString("currency"),
              rs.getTimestamp("transaction_date"),
              rs.getString("merchant_name"),
              rs.getString("merchant_category"));
          transactions.add(transaction);
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return transactions;
  }

  public List<SavingTransaction> getSavingTransactions(int savingId) {
    List<SavingTransaction> transactions = new ArrayList<>();
    String sql = "SELECT id, transaction_type, amount, currency, transaction_date " +
        "FROM savings_transactions WHERE saving_id = ? ORDER BY transaction_date DESC";

    try (PreparedStatement stmt = connection.prepareStatement(sql)) {
      stmt.setInt(1, savingId);
      try (ResultSet rs = stmt.executeQuery()) {
        while (rs.next()) {
          String typeStr = rs.getString("transaction_type");
          TransactionType type = "INCOME".equals(typeStr) ? TransactionType.INCOME : TransactionType.EXPENSE;

          SavingTransaction transaction = new SavingTransaction(
              rs.getInt("id"),
              savingId,
              type,
              rs.getBigDecimal("amount"),
              rs.getString("currency"),
              rs.getTimestamp("transaction_date"));
          transactions.add(transaction);
        }
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }

    return transactions;
  }

  public UserStatistics getUserStatistics(int userId) {
    User user = getUser(userId);
    if (user == null)
      return null;

    UserStatistics stats = new UserStatistics();

    stats.totalBalance = user.getCards().values().stream()
        .map(Card::getBalance)
        .reduce(BigDecimal.ZERO, BigDecimal::add);

    stats.activeCardsCount = (int) user.getCards().values().stream()
        .filter(Card::getIsActive)
        .count();

    stats.activeGoalsCount = (int) user.getGoals().values().stream()
        .filter(g -> g.getStatus() == GoalStatus.Active)
        .count();

    stats.completedGoalsCount = (int) user.getGoals().values().stream()
        .filter(g -> g.getStatus() == GoalStatus.Completed)
        .count();

    stats.totalSaved = user.getSavings().values().stream()
        .map(Saving::getCurrentAmount)
        .reduce(BigDecimal.ZERO, BigDecimal::add);

    stats.totalTarget = user.getSavings().values().stream()
        .map(Saving::getTargetAmount)
        .reduce(BigDecimal.ZERO, BigDecimal::add);

    if (stats.totalTarget.compareTo(BigDecimal.ZERO) > 0) {
      stats.overallProgress = stats.totalSaved
          .divide(stats.totalTarget, 4, RoundingMode.HALF_UP)
          .multiply(new BigDecimal("100"))
          .doubleValue();
    }

    return stats;
  }

  public static class UserStatistics {
    public BigDecimal totalBalance = BigDecimal.ZERO;
    public long activeCardsCount = 0;
    public long activeGoalsCount = 0;
    public long completedGoalsCount = 0;
    public BigDecimal totalSaved = BigDecimal.ZERO;
    public BigDecimal totalTarget = BigDecimal.ZERO;
    public double overallProgress = 0.0;

    @Override
    public String toString() {
      return String.format(
          "Статистика пользователя:\n" +
              "  💳 Общий баланс: %,.2f ₽\n" +
              "  💳 Активных карт: %d\n" +
              "  🎯 Активных целей: %d\n" +
              "  ✅ Завершенных целей: %d\n" +
              "  💰 Всего накоплено: %,.2f ₽\n" +
              "  🎯 Цель накоплений: %,.2f ₽\n" +
              "  📊 Общий прогресс: %.1f%%",
          totalBalance, activeCardsCount, activeGoalsCount,
          completedGoalsCount, totalSaved, totalTarget, overallProgress);
    }
  }

  @Override
  public void closeConnection() {
    if (connection != null) {
      try {
        connection.close();
      } catch (SQLException e) {
        e.printStackTrace();
      }
    }
  }

  @Override
  public boolean isConnected() {
    try {
      return connection != null && !connection.isClosed() && connection.isValid(5);
    } catch (SQLException e) {
      return false;
    }
  }
}