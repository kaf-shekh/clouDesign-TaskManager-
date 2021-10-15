import { Injectable } from '@angular/core';

@Injectable()
export class TaskService {

  data = [];
  constructor() { }

  // Get All Task
  getTask() {
    if (localStorage.getItem("task") !== undefined && localStorage.getItem("task") !== null) {
      return JSON.parse(localStorage.getItem("task") || "")
    }
    return null;
  }

  // Get Task By Id
  getTaskId(id: any) {
    let AllTask = this.getTask() || [];
    if (AllTask.length !== 0) {
      for (var x of AllTask) {
        if (x.TaskId === JSON.parse(id)) {
          return x;
        }
      }
    }
  }

  // Add Task
  addTask(value: any) {
    let AllTask = this.getTask() || [];
    if (AllTask.length == 0) {
      value.TaskId = 1
    } else {
      value.TaskId = AllTask[AllTask.length - 1].TaskId + 1;
    }
    AllTask.push(value);
    this.saveTask(AllTask);
  }

  // Delete Task
  deleteTask(id: number) {
    let AllTask = this.getTask() || [];
    if (AllTask.length !== 0) {
      for (var x in AllTask) {
        if (AllTask[x].TaskId === id) {
          AllTask.splice(x, 1)
          this.saveTask(AllTask);
        }
      }
      return;
    }
  }

  // Save Task
  saveTask(data: any) {
    localStorage.setItem("task", JSON.stringify(data));

  }

  // Update Task
  updateTask(id: number, value: any) {
    let AllTask = this.getTask() || [];
    if (AllTask.length !== 0) {
      for (var x in AllTask) {
        if (AllTask[JSON.parse(x)].TaskId === id) {
          AllTask.splice(x, x, value);
          this.saveTask(AllTask);
          return;
        }
      }
    }
  }

}
