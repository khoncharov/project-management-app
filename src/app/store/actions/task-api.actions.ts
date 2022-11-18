import { createAction, props } from '@ngrx/store';
import { CreatedTask, Task, UpdatedTask } from '../../core/models';

export const getTasksFailure = createAction(
  '[Task API] Get tasks failed',
  props<{ error: Error }>(),
);

export const getTasksSuccess = createAction(
  '[Task API] Tasks loaded',
  props<{ tasks: Task[] }>(),
);

export const getTaskFailure = createAction(
  '[Task API] Get task failed',
  props<{ error: Error }>(),
);

export const getTaskSuccess = createAction(
  '[Task API] Tasks loaded',
  props<{ task: Task }>(),
);

export const createTaskFailure = createAction(
  '[Task API] Task creation failed',
  props<{ error: Error }>(),
);

export const createTaskSuccess = createAction(
  '[Task API] Task created',
  props<{ task: CreatedTask }>(),
);

export const deleteTaskFailure = createAction(
  '[Task API] Delete task failed',
  props<{ error: Error }>(),
);

export const deleteTaskSuccess = createAction(
  '[Task API] Task deleted',
  props<{ id: string }>(),
);

export const updateTaskFailure = createAction(
  '[Task API] Update task failed',
  props<{ error: Error }>(),
);

export const updateTaskSuccess = createAction(
  '[Task API] Task updated',
  props<{ task: UpdatedTask }>(),
);
