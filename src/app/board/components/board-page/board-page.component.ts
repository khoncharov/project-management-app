import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { BoardWithColumns, CreateColumnDto } from '../../../core/models';
import * as fromSelectedBoard from '../../../store/selectors/selectedBoard.selectors';
import * as ColumnActions from '../../../store/actions/column.actions';

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
      const lastColumn = board.columns.at(-1);
      this.store.dispatch(
        ColumnActions.deleteColumn({
          boardId: board.id,
          columnId: lastColumn!.id,
        }),
      );
    }
  }
}
