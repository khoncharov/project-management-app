import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { TaskShort, UpdateTaskDto } from '../../../core/models';
import * as TaskActions from '../../../store/actions/task.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() boardId!: string;

  @Input() columnId!: string;

  @Input() task!: TaskShort;

  constructor(private store: Store) {}

  onTaskEdit(boardId: string, columnId: string, taskId: string): void {
    const task: UpdateTaskDto = {
      boardId,
      columnId,
      order: 1,
      title: 'new title 1',
      description: 'desc n-a',
      userId: 'f894dd8d-3b5d-4769-8eaa-f10eb60cd734',
    };

    this.store.dispatch(
      TaskActions.updateTask({
        boardId,
        columnId,
        taskId,
        task,
      }),
    );
  }

  onTaskDelete(boardId: string, columnId: string, taskId: string): void {
    this.store.dispatch(TaskActions.deleteTask({ boardId, columnId, taskId }));
  }
}
