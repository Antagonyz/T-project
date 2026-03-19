package entities;

import enums.GoalStatus;
import java.sql.Date;

public class Goal {
  private int id;
  private String title;
  private String description;
  private GoalStatus status;
  private Date deadline;

  public Goal(int id, String title, String description, GoalStatus status, Date deadline) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.deadline = deadline;
  }

  public int getId() {
    return this.id;
  }

  public String getTitle() {
    return this.title;
  }

  public String getDescription() {
    return this.description;
  }

  public GoalStatus getStatus() {
    return this.status;
  }

  public Date getDeadline() {
    return this.deadline;
  }
}
