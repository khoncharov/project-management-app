import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  BoardWithColumns,
  ColumnWithTasks,
  CreateTaskDto,
  TaskShort,
  UpdateTaskDto,
} from '../../../core/models';
import * as TaskActions from '../../../store/actions/task.actions';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() board!: BoardWithColumns;

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

  onTaskDrop(e: CdkDragDrop<string>): void {
    const isIndexChanged = e.currentIndex !== e.previousIndex;

    const currColumnId = e.container.data;
    const prevColumnId = e.previousContainer.data;
    const isContainerChanged = currColumnId !== prevColumnId;

    const isMoved = isIndexChanged || isContainerChanged;

    if (isMoved) {
      const boardId = this.board.id;

      const taskElement = e.item.element.nativeElement;
      const taskId = taskElement.id;

      const currTask = this.getTaskById(prevColumnId, taskId);

      if (currTask) {
        const task: UpdateTaskDto = {
          boardId,
          columnId: currColumnId,
          title: currTask.title,
          description: currTask.description,
          order: e.currentIndex + 1,
          userId: currTask.userId,
        };

        this.store.dispatch(
          TaskActions.updateTask({
            boardId,
            columnId: prevColumnId,
            taskId,
            task,
          }),
        );
      }
    }
  }

  getTaskById(columnId: string, id: string): TaskShort | undefined {
    let result: TaskShort | undefined;
    const column = this.board.columns.find((c) => c.id === columnId);
    if (column) {
      result = column.tasks.find((t) => t.id === id);
    }
    return result;
  }
}
