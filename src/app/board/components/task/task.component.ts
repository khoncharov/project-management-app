import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TaskShort, UpdateTaskDto, User } from '../../../core/models';
import * as TaskActions from '../../../store/actions/task.actions';
import * as fromSelectedBoard from '../../../store/selectors/selectedBoard.selectors';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() boardId!: string;

  @Input() columnId!: string;

  @Input() task!: TaskShort;

  protected users$!: Observable<User[]>;

  constructor(private store: Store) {
    this.users$ = this.store.select(fromSelectedBoard.selectUsers);
  }

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

  getIconColor(id: string): string {
    return `color: #${id.slice(0, 6)}`;
  }
}
