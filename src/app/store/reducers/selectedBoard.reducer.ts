import { createReducer, on } from '@ngrx/store';

import { BoardWithColumns, ColumnWithTasks, User } from '../../core/models';
import * as UserActions from '../actions/user.actions';
import * as UserApiActions from '../actions/user-api.actions';
import * as BoardActions from '../actions/board.actions';
import * as BoardApiActions from '../actions/board-api.actions';
import * as ColumnActions from '../actions/column.actions';
import * as ColumnApiActions from '../actions/column-api.actions';
import * as TaskActions from '../actions/task.actions';
import * as TaskApiActions from '../actions/task-api.actions';

export interface SelectedBoardState {
  board: BoardWithColumns | null;
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const initState: SelectedBoardState = {
  board: null,
  users: [],
  isLoading: false,
  error: null,
};

const onDataRequest = (state: SelectedBoardState): SelectedBoardState => ({
  ...state,
  error: null,
  isLoading: true,
});

export const selectedBoardReducer = createReducer(
  initState,

  // Remove error

  on(
    BoardActions.removeSelectedBoardError,
    (state): SelectedBoardState => ({
      ...state,
      error: null,
    }),
  ),

  // Get board

  on(BoardActions.getBoard, onDataRequest),
  on(
    BoardApiActions.getBoardFailure,
    (state, action): SelectedBoardState => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),
  ),
  on(
    BoardApiActions.getBoardSuccess,
    (state, action): SelectedBoardState => ({
      ...state,
      board: action.board,
      error: null,
      isLoading: false,
    }),
  ),

  // Get users

  on(UserActions.getUsers, onDataRequest),
  on(
    UserApiActions.getUsersFailure,
    (state, action): SelectedBoardState => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),
  ),
  on(
    UserApiActions.getUsersSuccess,
    (state, action): SelectedBoardState => ({
      ...state,
      users: action.users,
      error: null,
      isLoading: false,
    }),
  ),

  // Create column

  on(ColumnActions.createColumn, onDataRequest),
  on(
    ColumnApiActions.createColumnFailure,
    (state, action): SelectedBoardState => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),
  ),
  on(
    ColumnApiActions.createColumnSuccess,
    (state, action): SelectedBoardState => {
      if (state.board) {
        const newColumn: ColumnWithTasks = {
          ...action.column,
          tasks: [],
        };
        return {
          ...state,
          board: {
            ...state.board,
            columns: [...state.board.columns, newColumn],
          },
          error: null,
          isLoading: false,
        };
      }
      return state;
    },
  ),

  // Update column

  on(ColumnActions.updateColumn, onDataRequest),
  on(
    ColumnApiActions.updateColumnFailure,
    (state, action): SelectedBoardState => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),
  ),
  on(
    ColumnApiActions.updateColumnSuccess,
    (state, action): SelectedBoardState => {
      if (state.board) {
        return {
          ...state,
          board: {
            ...state.board,
            columns: [...action.board.columns],
          },
          error: null,
          isLoading: false,
        };
      }
      return state;
    },
  ),

  // Delete column

  on(ColumnActions.deleteColumn, onDataRequest),
  on(
    ColumnApiActions.deleteColumnFailure,
    (state, action): SelectedBoardState => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),
  ),
  on(
    ColumnApiActions.deleteColumnSuccess,
    (state, action): SelectedBoardState => {
      if (state.board) {
        const columns = state.board.columns.filter((c) => c.id !== action.id);
        return {
          ...state,
          board: {
            ...state.board,
            columns: [...columns],
          },
          error: null,
          isLoading: false,
        };
      }
      return state;
    },
  ),

  // Create task

  on(TaskActions.createTask, onDataRequest),
  on(
    TaskApiActions.createTaskFailure,
    (state, action): SelectedBoardState => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),
  ),
  on(
    TaskApiActions.createTaskSuccess,
    (state, action): SelectedBoardState => ({
      ...state,
      board: {
        ...action.board,
      },
      error: null,
      isLoading: false,
    }),
  ),

  // Update task

  on(TaskActions.updateTask, onDataRequest),
  on(
    TaskApiActions.updateTaskFailure,
    (state, action): SelectedBoardState => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),
  ),
  on(
    TaskApiActions.updateTaskSuccess,
    (state, action): SelectedBoardState => ({
      ...state,
      board: {
        ...action.board,
      },
      error: null,
      isLoading: false,
    }),
  ),

  // Delete task

  on(TaskActions.deleteTask, onDataRequest),
  on(
    TaskApiActions.deleteTaskFailure,
    (state, action): SelectedBoardState => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),
  ),
  on(
    TaskApiActions.deleteTaskSuccess,
    (state, action): SelectedBoardState => ({
      ...state,
      board: {
        ...action.board,
      },
      error: null,
      isLoading: false,
    }),
  ),
);
