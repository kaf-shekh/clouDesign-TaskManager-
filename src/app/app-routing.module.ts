import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTaskComponent } from './all-task/all-task.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {
    path: '', component: AllTaskComponent
  },
  {
    path: 'task/:id', component: TaskComponent
  },
  {
    path: 'task', component: TaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
