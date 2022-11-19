import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import {
  BoardWithColumns,
  ColumnWithTasks,
  CreateColumnDto,
  CreateTaskDto,
} from '../../../core/models';
import * as fromSelectedBoard from '../../../store/selectors/selectedBoard.selectors';
import * as ColumnActions from '../../../store/actions/column.actions';
import * as TaskActions from '../../../store/actions/task.actions';
import * as UserActions from '../../../store/actions/user.actions';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  protected board$!: Observable<BoardWithColumns | null>;

  protected error$!: Observable<string | null>;

  private errorSub!: Subscription;

  protected isLoading$!: Observable<boolean>;

  constructor(private store: Store, private errorBar: MatSnackBar) {}

  ngOnInit(): void {
    this.board$ = this.store.select(fromSelectedBoard.selectBoard);
    this.error$ = this.store.select(fromSelectedBoard.selectError);
    this.isLoading$ = this.store.select(fromSelectedBoard.selectProgress);

    this.errorSub = this.error$.subscribe((err) => {
      if (err) {
        this.errorBar.open(err, 'Ok', {
          verticalPosition: 'top',
        });
      }
    });

    this.store.dispatch(UserActions.getUsers());
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onColumnAdd(boardId: string): void {
    const column: CreateColumnDto = {
      title: 'New column',
    };

    this.store.dispatch(ColumnActions.createColumn({ boardId, column }));
  }

  onColumnDelete(board: BoardWithColumns): void {
    if (board.columns.length) {
      const columns = board.columns.map((c) => ({
        order: c.order,
        id: c.id,
      }));
      columns.sort((a, b) => a.order - b.order);
      const lastColumnId = columns.at(-1)!.id;

      this.store.dispatch(
        ColumnActions.deleteColumn({
          boardId: board.id,
          columnId: lastColumnId,
        }),
      );
    }
  }

  onColumnEdit(column: ColumnWithTasks): void {
    // eslint-disable-next-line no-console
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

  onTaskDelete(boardId: string, columnId: string, taskId: string): void {
    this.store.dispatch(TaskActions.deleteTask({ boardId, columnId, taskId }));
  }
}
