package interfaces;

import entities.Card;
import entities.CardTransaction;
import entities.Goal;
import entities.Saving;
import entities.SavingTransaction;
import entities.User;
import java.util.List;
import java.util.Map;

public interface IGetQueries {
  User getUser(int id);

  Map<Integer, Card> getUserCards(int userId);

  Map<Integer, Goal> getUserGoals(int userId);

  Map<Integer, Saving> getUserSavings(int userId);

  Card getCardById(int cardId);

  Goal getGoalById(int goalId);

  Saving getSavingById(int savingId);

  List<CardTransaction> getCardTransactions(int cardId);

  List<SavingTransaction> getSavingTransactions(int savingId);

  void closeConnection();

  boolean isConnected();
}