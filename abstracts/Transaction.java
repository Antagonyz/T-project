package abstracts;

import java.math.BigDecimal;
import java.sql.Timestamp;
import enums.TransactionType;

public abstract class Transaction {
  private int id;
  private TransactionType type;
  private BigDecimal amount;
  private String currency;
  private Timestamp date;

  public Transaction(int id, TransactionType type, BigDecimal amount, String currency, Timestamp date) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.currency = currency;
    this.date = date;
  }

  public int getId() {
    return id;
  }

  public TransactionType getType() {
    return type;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public String getCurrency() {
    return currency;
  }

  public Timestamp getDate() {
    return date;
  }

  public boolean isIncome() {
    return type == TransactionType.INCOME;
  }

  public boolean isExpense() {
    return type == TransactionType.EXPENSE;
  }
}