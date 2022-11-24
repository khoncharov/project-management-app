import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import {
  BoardWithColumns,
  ColumnWithTasks,
  CreateTaskDto,
  TaskShort,
  UpdateColumnDto,
  UpdateTaskDto,
} from '../../../core/models';
import * as TaskActions from '../../../store/actions/task.actions';
import * as ColumnActions from '../../../store/actions/column.actions';
import {
  TaskDialogComponent,
  TaskTransferData,
} from '../task-dialog/task-dialog.component';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() board!: BoardWithColumns;

  @Input() column!: ColumnWithTasks;

  protected isColumnTitleShown = true;

  private confirmTitle!: string;

  private confirmMessage!: string;

  constructor(
    private store: Store,
    protected dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  onColumnEdit(): void {
    this.isColumnTitleShown = false;
  }

  onColumnUpdate(columnTitle: string): void {
    this.isColumnTitleShown = true;
    if (columnTitle && columnTitle !== this.column.title) {
      const column: UpdateColumnDto = {
        order: this.column.order,
        title: columnTitle,
      };

      this.store.dispatch(
        ColumnActions.updateColumn({
          boardId: this.board.id,
          columnId: this.column.id,
          column,
        }),
      );
    }
  }

  onTaskAdd(boardId: string, columnId: string): void {
    const data: TaskTransferData = {
      isNewTask: true,
      task: {
        title: '',
        description: '',
        userId: '',
      },
    };

    const dialogRef = this.dialog.open(TaskDialogComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const task = result as CreateTaskDto;
        this.store.dispatch(
          TaskActions.createTask({ boardId, columnId, task }),
        );
      }
    });
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

  onColumnDelete(): void {
    this.getConfirmTranslate();
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: this.confirmTitle,
        message: this.confirmMessage,
      },
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.store.dispatch(
          ColumnActions.deleteColumn({
            boardId: this.board.id,
            columnId: this.column.id,
          }),
        );
      }
    });
  }

  private getConfirmTranslate(): void {
    this.translateService.get(['boardPage']).subscribe((translations) => {
      this.confirmTitle = translations.boardPage.title;
      this.confirmMessage = translations.boardPage.message;
    });
  }
}
