import { createReducer, on } from '@ngrx/store';

import { ErrType } from './auth.reducer';
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
  error: ErrType | null;
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

const moveItem = <T>(arr: Array<T>, from: number, to: number): Array<T> => {
  const a = [...arr];

  const item = a.splice(from, 1)[0];
  a.splice(to, 0, item);

  return a;
};

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
      error: {
        code: action.error.status,
        msg: action.error.error.message,
        action: BoardActions.getBoard,
      },
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
      error: {
        code: action.error.status,
        msg: action.error.error.message,
        action: UserActions.getUsers,
      },
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
      error: {
        code: action.error.status,
        msg: action.error.error.message,
        action: ColumnActions.createColumn,
      },
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

  on(ColumnActions.updateColumn, (state, action): SelectedBoardState => {
    if (state.board) {
      const columns = [...state.board.columns];
      columns.sort((a, b) => a.order - b.order);

      const from = columns.findIndex((c) => c.id === action.columnId);
      const to = action.column.order - 1;

      if (from > -1) {
        const newCols = moveItem<ColumnWithTasks>(columns, from, to).map(
          (c, i) => ({
            ...c,
            order: i + 1,
          }),
        );

        return {
          ...state,
          board: {
            ...state.board,
            columns: [...newCols],
          },
          error: null,
          isLoading: true,
        };
      }
    }
    return {
      ...state,
      error: null,
      isLoading: true,
    };
  }),
  on(
    ColumnApiActions.updateColumnFailure,
    (state, action): SelectedBoardState => ({
      ...state,
      error: {
        code: action.error.status,
        msg: action.error.error.message,
        action: ColumnActions.updateColumn,
      },
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
      error: {
        code: action.error.status,
        msg: action.error.error.message,
        action: ColumnActions.deleteColumn,
      },
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
      error: {
        code: action.error.status,
        msg: action.error.error.message,
        action: TaskActions.createTask,
      },
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

  on(TaskActions.updateTask, (state): SelectedBoardState => {
    if (state.board) {
      // pass
    }
    return {
      ...state,
      error: null,
      isLoading: true,
    };
  }),
  on(
    TaskApiActions.updateTaskFailure,
    (state, action): SelectedBoardState => ({
      ...state,
      error: {
        code: action.error.status,
        msg: action.error.error.message,
        action: TaskActions.updateTask,
      },
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
      error: {
        code: action.error.status,
        msg: action.error.error.message,
        action: TaskActions.deleteTask,
      },
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
