package entities;

import java.sql.Date;

public class Task {
  private int id;
  private Integer closesGoalId; // может быть null
  private String name;
  private String description;
  private Date deadline;
  private boolean status; // true = выполнена, false = не выполнена

  public Task(int id, Integer closesGoalId, String name, String description, Date deadline, boolean status) {
    this.id = id;
    this.closesGoalId = closesGoalId;
    this.name = name;
    this.description = description;
    this.deadline = deadline;
    this.status = status;
  }

  public int getId() {
    return id;
  }

  public Integer getClosesGoalId() {
    return closesGoalId;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public Date getDeadline() {
    return deadline;
  }

  public boolean isStatus() {
    return status;
  }

  public boolean isCompleted() {
    return status;
  }

  public boolean isOverdue() {
    return !status && deadline != null &&
        deadline.before(new Date(System.currentTimeMillis()));
  }

  @Override
  public String toString() {
    String statusStr = status ? "✅" : "⭕";
    if (isOverdue())
      statusStr = "⚠️" + statusStr;

    return String.format("Task{id=%d, name='%s', status=%s, deadline=%s, goalId=%d}",
        id, name, statusStr, deadline, closesGoalId);
  }
}