package entities;

import java.util.Map;

public class User {
  private int id;
  private String fullName;
  private Map<Integer, Card> cards;
  private Map<Integer, Goal> goals;
  private Map<Integer, Saving> savings;

  public User(int id, String fullName, Map<Integer, Card> cards, Map<Integer, Goal> goals,
      Map<Integer, Saving> savings) {
    this.id = id;
    this.fullName = fullName;
    this.cards = cards;
    this.goals = goals;
    this.savings = savings;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public void setCards(Map<Integer, Card> cards) {
    this.cards = cards;
  }

  public void setGoals(Map<Integer, Goal> goals) {
    this.goals = goals;
  }

  public void setSavings(Map<Integer, Saving> savings) {
    this.savings = savings;
  }

  public int getId() {
    return this.id;
  }

  public String getFullName() {
    return this.fullName;
  }

  public Map<Integer, Card> getCards() {
    return this.cards;
  }

  public Map<Integer, Goal> getGoals() {
    return this.goals;
  }

  public Map<Integer, Saving> getSavings() {
    return this.savings;
  }
}