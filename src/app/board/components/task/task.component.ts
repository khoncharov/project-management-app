import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { TaskShort } from '../../../core/models';
import * as TaskActions from '../../../store/actions/task.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: TaskShort;

  constructor(private store: Store) {}

  onTaskEdit(): void {
    console.log('onTaskEdit');
  }

  onTaskDelete(boardId: string, columnId: string, taskId: string): void {
    this.store.dispatch(TaskActions.deleteTask({ boardId, columnId, taskId }));
  }
}
