import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
})
export class TaskDetailComponent {

  constructor() { }

  @Input() Title: string;
  @Input() Description: string;
  @Input() Status: string;
  @Input() Datetime: string;
  @Input() TaskId: number;

}
