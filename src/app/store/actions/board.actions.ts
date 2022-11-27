import { createAction, props } from '@ngrx/store';
import { CreateBoardDto, UpdateBoardDto } from '../../core/models/board.model';

export const getBoards = createAction('[Board] Get boards list');

export const createBoard = createAction(
  '[Board] Create board',
  props<{ board: CreateBoardDto }>(),
);

export const getBoard = createAction(
  '[Board] Get board data',
  props<{ id: string }>(),
);

export const deleteBoard = createAction(
  '[Board] Delete board',
  props<{ id: string }>(),
);

export const updateBoard = createAction(
  '[Board] Update board',
  props<{ id: string; board: UpdateBoardDto }>(),
);

export const removeProjectsError = createAction(
  '[Board] Remove request error in projects',
);

export const removeSelectedBoardError = createAction(
  '[Board] Remove request error in selected board',
);
