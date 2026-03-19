package entities;

import enums.CardType;
import java.math.BigDecimal;

public class Card {
  private int id;
  private String serialNumber;
  private BigDecimal balance;
  private CardType type;
  private boolean isActive;

  public Card(int id, String cardNumber, BigDecimal balance, CardType cardType, boolean isActive) {
    this.id = id;
    this.serialNumber = cardNumber;
    this.balance = balance;
    this.type = cardType;
    this.isActive = isActive;
  }

  public int getId() {
    return this.id;
  }

  public String getSerialNumber() {
    return this.serialNumber;
  }

  public BigDecimal getBalance() {
    return this.balance;
  }

  public CardType getType() {
    return this.type;
  }

  public boolean getIsActive() {
    return this.isActive;
  }
}