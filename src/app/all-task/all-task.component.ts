import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.scss']
})
export class AllTaskComponent implements AfterViewChecked {
  Tasks = [];

  Open = [];
  inProgress = [];
  Complete = [];

  // Open = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];

  // inProgress = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];
  // Complete = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];

  constructor(
    private taskService: TaskService,
    private cdRef: ChangeDetectorRef

  ) {
    this.getAllTask();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  // Not working yet
  // Change status of Task
  drop(event: CdkDragDrop<[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  // Get All Task
  getAllTask() {
    this.Tasks = this.taskService.getTask();
    if (this.Tasks !== null) {
      for (var x of this.Tasks) {
        switch (x.Status) {
          case 'Open':
            this.Open.push(x);
            break;
          case 'In-Progress':
            this.inProgress.push(x);
            break;
          case 'Completed':
            this.Complete.push(x);
            break;
          default:
            break;
        }
      }
    }
  }

}
