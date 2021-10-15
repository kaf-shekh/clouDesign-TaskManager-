import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  taskForm: FormGroup;
  submitted = false;
  status = Status;
  isAdd = true;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.initialzeForm();
    this.router.params.subscribe(params => {
      if (params.id) {
        var data = this.taskService.getTaskId(params.id);
        if (data !== undefined) {
          this.isAdd = false;
          this.taskForm.setValue(data);
        }
      }
    })
  }

  ngOnInit() {
  }


  // Initialize Task Form
  initialzeForm() {
    this.taskForm = this.fb.group({
      TaskId: [],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Status: ['', Validators.required],
      Datetime: ['', Validators.required],
    })

  }

  // Save Task
  save() {
    this.submitted = true;
    if (this.taskForm.valid) {
      if (this.isAdd) {
        this.taskService.addTask(this.taskForm.value);
      } else {
        this.taskService.updateTask(this.taskForm.value.TaskId, this.taskForm.value);
      }
      this.cancel();
    }
  }

  // Cancel Task
  cancel() {
    this.submitted = false;
    this.taskForm.reset();
    this.route.navigate(['']);
  }

  // Delete Task
  deleteTask() {
    this.taskService.deleteTask(this.taskForm.value.TaskId);
    this.cancel();
  }
}
