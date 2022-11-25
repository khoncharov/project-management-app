/* eslint-disable operator-linebreak */
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import {
  CreateTaskDto,
  TaskShort,
  UpdateTaskDto,
  User,
} from '../../../core/models';
import * as TaskActions from '../../../store/actions/task.actions';
import * as fromSelectedBoard from '../../../store/selectors/selectedBoard.selectors';
import {
  TaskDialogComponent,
  TaskTransferData,
} from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() boardId!: string;

  @Input() columnId!: string;

  @Input() task!: TaskShort;

  private confirmTitle!: string;

  private confirmMessage!: string;

  protected users$!: Observable<User[]>;

  constructor(
    private store: Store,
    protected dialog: MatDialog,
    private translateService: TranslateService,
  ) {
    this.users$ = this.store.select(fromSelectedBoard.selectUsers);
  }

  onTaskEdit(boardId: string, columnId: string, currTask: TaskShort): void {
    const data: TaskTransferData = {
      isNewTask: false,
      task: {
        title: currTask.title,
        description: currTask.description,
        userId: currTask.userId,
      },
    };

    const dialogRef = this.dialog.open(TaskDialogComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const task = result as CreateTaskDto;

        const isUpdated =
          currTask.title !== task.title ||
          currTask.description !== task.description ||
          currTask.userId !== task.userId;

        if (isUpdated) {
          const updatedTask: UpdateTaskDto = {
            boardId,
            columnId,
            order: currTask.order,
            title: task.title,
            description: task.description,
            userId: task.userId,
          };

          this.store.dispatch(
            TaskActions.updateTask({
              boardId,
              columnId,
              taskId: currTask.id,
              task: updatedTask,
            }),
          );
        }
      }
    });
  }

  onTaskDelete(boardId: string, columnId: string, taskId: string): void {
    this.getConfirmTranslate();
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: this.confirmTitle,
        message: this.confirmMessage,
      },
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;
      this.store.dispatch(
        TaskActions.deleteTask({ boardId, columnId, taskId }),
      );
    });
  }

  getIconColor(id: string): string {
    return `color: #${id.slice(0, 6)}`;
  }

  private getConfirmTranslate(): void {
    this.translateService.get(['task']).subscribe((translations) => {
      this.confirmTitle = translations.task.deleteTask;
      this.confirmMessage = translations.task.message;
    });
  }
}
