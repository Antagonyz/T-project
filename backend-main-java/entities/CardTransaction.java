package entities;

import java.math.BigDecimal;
import java.sql.Timestamp;
import abstracts.Transaction;
import enums.TransactionType;

public class CardTransaction extends Transaction {
  private int cardId;
  private String merchantName;
  private String merchantCategory;

  public CardTransaction(int id, int cardId, TransactionType type, BigDecimal amount,
      String currency, Timestamp date, String merchantName, String merchantCategory) {
    super(id, type, amount, currency, date);
    this.cardId = cardId;
    this.merchantName = merchantName;
    this.merchantCategory = merchantCategory;
  }

  public int getCardId() {
    return cardId;
  }

  public String getMerchantName() {
    return merchantName;
  }

  public String getMerchantCategory() {
    return merchantCategory;
  }

  @Override
  public String toString() {
    return String.format("CardTransaction{id=%d, type=%s, amount=%s %s, merchant='%s'}",
        getId(), getType(), getAmount(), getCurrency(), merchantName);
  }
}