import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Board, BoardWithColumns } from '../../core/models/board.model';

export const getBoardsFailure = createAction(
  '[Board API] Get boards failed',
  props<{ error: HttpErrorResponse }>(),
);

export const getBoardsSuccess = createAction(
  '[Board API] Boards list loaded',
  props<{ boards: Board[] }>(),
);

export const createBoardFailure = createAction(
  '[Board API] Board creation failed',
  props<{ error: HttpErrorResponse }>(),
);

export const createBoardSuccess = createAction(
  '[Board API] Board created',
  props<{ board: Board }>(),
);

export const getBoardFailure = createAction(
  '[Board API] Get board failed',
  props<{ error: HttpErrorResponse }>(),
);

export const getBoardSuccess = createAction(
  '[Board API] Board loaded',
  props<{ board: BoardWithColumns }>(),
);

export const deleteBoardFailure = createAction(
  '[Board API] Delete board failed',
  props<{ error: HttpErrorResponse }>(),
);

export const deleteBoardSuccess = createAction(
  '[Board API] Board deleted',
  props<{ boards: Board[] }>(),
);

export const updateBoardFailure = createAction(
  '[Board API] Update board failed',
  props<{ error: HttpErrorResponse }>(),
);

export const updateBoardSuccess = createAction(
  '[Board API] Board updated',
  props<{ board: Board }>(),
);
