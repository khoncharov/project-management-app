import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { BoardWithColumns, Task } from '../../core/models';

export const getTasksFailure = createAction(
  '[Task API] Get tasks failed',
  props<{ error: HttpErrorResponse }>(),
);

export const getTasksSuccess = createAction(
  '[Task API] Tasks loaded',
  props<{ tasks: Task[] }>(),
);

export const getTaskFailure = createAction(
  '[Task API] Get task failed',
  props<{ error: HttpErrorResponse }>(),
);

export const getTaskSuccess = createAction(
  '[Task API] Tasks loaded',
  props<{ task: Task }>(),
);

export const createTaskFailure = createAction(
  '[Task API] Task creation failed',
  props<{ error: HttpErrorResponse }>(),
);

export const createTaskSuccess = createAction(
  '[Task API] Task created',
  props<{ board: BoardWithColumns }>(),
);

export const deleteTaskFailure = createAction(
  '[Task API] Delete task failed',
  props<{ error: HttpErrorResponse }>(),
);

export const deleteTaskSuccess = createAction(
  '[Task API] Task deleted',
  props<{ board: BoardWithColumns }>(),
);

export const updateTaskFailure = createAction(
  '[Task API] Update task failed',
  props<{ error: HttpErrorResponse }>(),
);

export const updateTaskSuccess = createAction(
  '[Task API] Task updated',
  props<{ board: BoardWithColumns }>(),
);
