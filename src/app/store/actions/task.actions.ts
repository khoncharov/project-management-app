import { createAction, props } from '@ngrx/store';
import { CreateTaskDto, UpdateTaskDto } from '../../core/models';

export const getTasks = createAction(
  '[Task] Get tasks list',
  props<{ boardId: string; columnId: string }>(),
);

export const createTask = createAction(
  '[Task] Create task',
  props<{ boardId: string; columnId: string; task: CreateTaskDto }>(),
);

export const getTask = createAction(
  '[Task] Get task data',
  props<{ boardId: string; columnId: string; taskId: string }>(),
);

export const deleteTask = createAction(
  '[Task] Delete task',
  props<{ boardId: string; columnId: string; taskId: string }>(),
);

export const updateTask = createAction(
  '[Task] Update task',
  props<{
    boardId: string;
    columnId: string;
    taskId: string;
    task: UpdateTaskDto;
  }>(),
);
