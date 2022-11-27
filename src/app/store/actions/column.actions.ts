import { createAction, props } from '@ngrx/store';
import { CreateColumnDto, UpdateColumnDto } from '../../core/models';

export const getColumns = createAction(
  '[Column] Get columns list',
  props<{ boardId: string }>(),
);

export const createColumn = createAction(
  '[Column] Create column',
  props<{ boardId: string; column: CreateColumnDto }>(),
);

export const getColumn = createAction(
  '[Column] Get column data',
  props<{ boardId: string; columnId: string }>(),
);

export const deleteColumn = createAction(
  '[Column] Delete column',
  props<{ boardId: string; columnId: string }>(),
);

export const updateColumn = createAction(
  '[Column] Update column',
  props<{ boardId: string; columnId: string; column: UpdateColumnDto }>(),
);
