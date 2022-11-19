import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { ColumnWithTasks, CreateTaskDto } from '../../../core/models';
import * as TaskActions from '../../../store/actions/task.actions';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() boardId!: string;

  @Input() column!: ColumnWithTasks;

  constructor(private store: Store) {}

  onColumnEdit(column: ColumnWithTasks): void {
    console.log(column.order, column.id);
  }

  onTaskAdd(boardId: string, columnId: string): void {
    const currUserId = 'ae02b5f0-1419-456e-b76c-fe95a3b606b8';

    const task: CreateTaskDto = {
      title: 'New task',
      description: 'Describe you task',
      userId: currUserId,
    };

    this.store.dispatch(TaskActions.createTask({ boardId, columnId, task }));
  }
}
