import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { BoardWithColumns } from '../../core/models';
import { Column, ColumnWithTasks } from '../../core/models/column.model';

export const getColumnsFailure = createAction(
  '[Column API] Get columns failed',
  props<{ error: HttpErrorResponse }>(),
);

export const getColumnsSuccess = createAction(
  '[Column API] Columns list loaded',
  props<{ columns: Column[] }>(),
);

export const createColumnFailure = createAction(
  '[Column API] Column creation failed',
  props<{ error: HttpErrorResponse }>(),
);

export const createColumnSuccess = createAction(
  '[Column API] Column created',
  props<{ column: Column }>(),
);

export const getColumnFailure = createAction(
  '[Column API] Get column failed',
  props<{ error: HttpErrorResponse }>(),
);

export const getColumnSuccess = createAction(
  '[Column API] Column loaded',
  props<{ column: ColumnWithTasks }>(),
);

export const deleteColumnFailure = createAction(
  '[Column API] Delete column failed',
  props<{ error: HttpErrorResponse }>(),
);

export const deleteColumnSuccess = createAction(
  '[Column API] Column deleted',
  props<{ id: string }>(),
);

export const updateColumnFailure = createAction(
  '[Column API] Update column failed',
  props<{ error: HttpErrorResponse }>(),
);

export const updateColumnSuccess = createAction(
  '[Column API] Column updated',
  props<{ board: BoardWithColumns }>(),
);
