package entities;

import java.math.BigDecimal;

public class Saving {
  private int id;
  private String title;
  private Goal closesGoal;
  private BigDecimal targetAmount;
  private BigDecimal currentAmount;
  private String currency;

  public Saving(int id, String title, Goal closesGoal, BigDecimal targetAmount, BigDecimal currentAmount,
      String currency) {
    this.id = id;
    this.title = title;
    this.closesGoal = closesGoal;
    this.targetAmount = targetAmount;
    this.currentAmount = currentAmount;
    this.currency = currency;
  }

  public int getId() {
    return this.id;
  }

  public String getTitle() {
    return this.title;
  }

  public Goal getClosesGoal() {
    return this.closesGoal;
  }

  public BigDecimal getTargetAmount() {
    return this.targetAmount;
  }

  public BigDecimal getCurrentAmount() {
    return this.currentAmount;
  }

  public String getCurrency() {
    return this.currency;
  }
}