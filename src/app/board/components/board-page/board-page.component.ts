import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import {
  BoardWithColumns,
  ColumnWithTasks,
  CreateColumnDto,
  UpdateColumnDto,
} from 'src/app/core/models';
import * as fromSelectedBoard from '../../../store/selectors/selectedBoard.selectors';
import * as ColumnActions from '../../../store/actions/column.actions';
import * as UserActions from '../../../store/actions/user.actions';
import { ColumnDialogComponent } from '../column-dialog/column-dialog.component';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  protected board$!: Observable<BoardWithColumns | null>;

  protected isLoading$!: Observable<boolean>;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUsers());

    this.board$ = this.store.select(fromSelectedBoard.selectBoard);

    this.isLoading$ = this.store.select(fromSelectedBoard.selectProgress);
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
