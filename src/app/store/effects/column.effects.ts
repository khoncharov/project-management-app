/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { ColumnsApiService } from '../../core/services/api/columns-api.service';
import * as ColumnActions from '../actions/column.actions';
import * as ColumnApiActions from '../actions/column-api.actions';

@Injectable()
export class ColumnEffects {
  constructor(
    private actions$: Actions,
    private columnApi: ColumnsApiService,
  ) {}

  getColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.getColumns),
      mergeMap((payload) => {
        return this.columnApi.getColumns(payload.boardId).pipe(
          map((columns) => ColumnApiActions.getColumnsSuccess({ columns })),
          catchError((error) =>
            of(ColumnApiActions.getColumnsFailure({ error })),
          ),
        );
      }),
    );
  });

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.createColumn),
      mergeMap((payload) => {
        return this.columnApi
          .createColumn(payload.boardId, payload.column)
          .pipe(
            map((column) => ColumnApiActions.createColumnSuccess({ column })),
            catchError((error) =>
              of(ColumnApiActions.createColumnFailure({ error })),
            ),
          );
      }),
    );
  });

  getColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.getColumn),
      mergeMap((payload) => {
        return this.columnApi.getColumn(payload.boardId, payload.columnId).pipe(
          map((column) => ColumnApiActions.getColumnSuccess({ column })),
          catchError((error) =>
            of(ColumnApiActions.getColumnFailure({ error })),
          ),
        );
      }),
    );
  });

  updateColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.updateColumn),
      mergeMap((payload) => {
        return this.columnApi
          .updateColumn(payload.boardId, payload.columnId, payload.column)
          .pipe(
            map((column) => ColumnApiActions.updateColumnSuccess({ column })),
            catchError((error) =>
              of(ColumnApiActions.updateColumnFailure({ error })),
            ),
          );
      }),
    );
  });

  deleteColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColumnActions.deleteColumn),
      mergeMap((payload) => {
        return this.columnApi
          .deleteColumnAndGetId(payload.boardId, payload.columnId)
          .pipe(
            map(({ id }) => ColumnApiActions.deleteColumnSuccess({ id })),
            catchError((error) =>
              of(ColumnApiActions.deleteColumnFailure({ error })),
            ),
          );
      }),
    );
  });
}
