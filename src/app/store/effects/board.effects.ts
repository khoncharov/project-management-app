/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { BoardsApiService } from '../../core/services/api/boards-api.service';
import * as BoardActions from '../actions/board.actions';
import * as BoardApiActions from '../actions/board-api.actions';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private boardApi: BoardsApiService) {}

  getBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.getBoards),
      mergeMap(() => {
        return this.boardApi.getBoards().pipe(
          map((boards) => BoardApiActions.getBoardsSuccess({ boards })),
          catchError((error) =>
            of(BoardApiActions.getBoardsFailure({ error })),
          ),
        );
      }),
    );
  });

  getBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.getBoard),
      mergeMap((payload) => {
        return this.boardApi.getBoard(payload.id).pipe(
          map((board) => BoardApiActions.getBoardSuccess({ board })),
          catchError((error) => of(BoardApiActions.getBoardFailure({ error }))),
        );
      }),
    );
  });

  updateBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.updateBoard),
      mergeMap((payload) => {
        return this.boardApi.updateBoard(payload.id, payload.board).pipe(
          map((board) => BoardApiActions.updateBoardSuccess({ board })),
          catchError((error) =>
            of(BoardApiActions.updateBoardFailure({ error })),
          ),
        );
      }),
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.deleteBoard),
      mergeMap((payload) => {
        return this.boardApi.deleteBoard(payload.id).pipe(
          map(() => BoardApiActions.deleteBoardSuccess()),
          catchError((error) =>
            of(BoardApiActions.deleteBoardFailure({ error })),
          ),
        );
      }),
    );
  });
}
