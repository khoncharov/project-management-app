import { createAction, props } from '@ngrx/store';
import { Column, ColumnWithTasks } from '../../core/models/column.model';

export const getColumnsFailure = createAction(
  '[Column API] Get columns failed',
  props<{ error: Error }>(),
);

export const getColumnsSuccess = createAction(
  '[Column API] Columns list loaded',
  props<{ columns: Column[] }>(),
);

export const createColumnFailure = createAction(
  '[Column API] Column creation failed',
  props<{ error: Error }>(),
);

export const createColumnSuccess = createAction(
  '[Column API] Column created',
  props<{ column: Column }>(),
);

export const getColumnFailure = createAction(
  '[Column API] Get column failed',
  props<{ error: Error }>(),
);

export const getColumnSuccess = createAction(
  '[Column API] Column loaded',
  props<{ column: ColumnWithTasks }>(),
);

export const deleteColumnFailure = createAction(
  '[Column API] Delete column failed',
  props<{ error: Error }>(),
);

export const deleteColumnSuccess = createAction(
  '[Column API] Column deleted',
  props<{ columns: Column[] }>(),
);

export const updateColumnFailure = createAction(
  '[Column API] Update column failed',
  props<{ error: Error }>(),
);

export const updateColumnSuccess = createAction(
  '[Column API] Column updated',
  props<{ column: Column }>(),
);
