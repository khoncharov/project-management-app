import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import {
  BoardWithColumns,
  ColumnWithTasks,
  CreateColumnDto,
  UpdateColumnDto,
} from 'src/app/core/models';
import * as fromSelectedBoard from '../../../store/selectors/selectedBoard.selectors';
import * as BoardActions from '../../../store/actions/board.actions';
import * as ColumnActions from '../../../store/actions/column.actions';
import * as UserActions from '../../../store/actions/user.actions';
import { ColumnDialogComponent } from '../column-dialog/column-dialog.component';

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

  constructor(
    private store: Store,
    private errorBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUsers());

    this.board$ = this.store.select(fromSelectedBoard.selectBoard);
    this.error$ = this.store.select(fromSelectedBoard.selectError);
    this.isLoading$ = this.store.select(fromSelectedBoard.selectProgress);

    this.errorSub = this.error$.subscribe((err) => {
      if (err) {
        this.errorBar.open(err, 'Ok', {
          verticalPosition: 'top',
          panelClass: 'snack-bar-light',
        });
        this.store.dispatch(BoardActions.removeSelectedBoardError());
      }
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onColumnAdd(boardId: string): void {
    const dialogRef = this.dialog.open(ColumnDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      const columnTitle: string = result;
      if (columnTitle) {
        const column: CreateColumnDto = {
          title: columnTitle,
        };

        this.store.dispatch(ColumnActions.createColumn({ boardId, column }));
      }
    });
  }

  onColumnDrop(e: CdkDragDrop<string[]>, board: BoardWithColumns): void {
    const isMoved = e.currentIndex !== e.previousIndex;

    if (isMoved) {
      const boardId = board.id;

      const columnElement = e.item.element.nativeElement;
      const columnId = columnElement.id;

      const currColumn = this.getColumnById(board, columnId);
      if (currColumn) {
        const column: UpdateColumnDto = {
          title: currColumn.title,
          order: e.currentIndex + 1,
        };

        this.store.dispatch(
          ColumnActions.updateColumn({
            boardId,
            columnId,
            column,
          }),
        );
      }
    }
  }

  getColumnById(
    board: BoardWithColumns,
    id: string,
  ): ColumnWithTasks | undefined {
    return board.columns.find((c) => c.id === id);
  }
}
