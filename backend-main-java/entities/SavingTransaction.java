package entities;

import java.math.BigDecimal;
import java.sql.Timestamp;
import abstracts.Transaction;
import enums.TransactionType;

public class SavingTransaction extends Transaction {
  private int savingId;

  public SavingTransaction(int id, int savingId, TransactionType type, BigDecimal amount,
      String currency, Timestamp date) {
    super(id, type, amount, currency, date);
    this.savingId = savingId;
  }

  public int getSavingId() {
    return savingId;
  }

  @Override
  public String toString() {
    return String.format("SavingTransaction{id=%d, type=%s, amount=%s %s}",
        getId(), getType(), getAmount(), getCurrency());
  }
}