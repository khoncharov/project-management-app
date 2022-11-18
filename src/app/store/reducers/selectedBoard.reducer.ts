import { createReducer, on } from '@ngrx/store';

import {
  BoardWithColumns,
  ColumnWithTasks,
  TaskShort,
} from '../../core/models';
import * as BoardActions from '../actions/board.actions';
import * as BoardApiActions from '../actions/board-api.actions';
import * as ColumnActions from '../actions/column.actions';
import * as ColumnApiActions from '../actions/column-api.actions';
import * as TaskActions from '../actions/task.actions';
import * as TaskApiActions from '../actions/task-api.actions';

export interface SelectedBoardState {
  board: BoardWithColumns | null;
  isLoading: boolean;
  error: string | null;
}

const initState: SelectedBoardState = {
  board: null,
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
        const column = state.board.columns.find(
          (c) => c.id === action.column.id,
        );
        if (column) {
          column.title = action.column.title;
          column.order = action.column.order;

          return {
            board: {
              ...state.board,
            },
            error: null,
            isLoading: false,
          };
        }
        return state;
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
  on(TaskApiActions.createTaskSuccess, (state, action): SelectedBoardState => {
    const newTask = action.task;
    const newTaskMapped: TaskShort = {
      id: newTask.id,
      title: newTask.title,
      description: newTask.description,
      order: newTask.order,
      userId: newTask.userId,
      files: [],
    };
    const updatedColumns = [];

    if (state.board) {
      const column = state.board.columns.find((c) => c.id === newTask.columnId);
      console.log(column);

      if (column) {
        column.tasks.push(newTaskMapped);
        console.log(state);

        return {
          board: {
            ...state.board,
            columns: [...updatedColumns],
          },
          error: null,
          isLoading: false,
        };
      }
      return state;
    }
    // if (state.board) {
    //   const newTask: TaskShort = {
    //     ...action.task,
    //     tasks: [],
    //   };
    //   return {
    //     board: {
    //       ...state.board,
    //       columns: [...state.board.columns, newColumn],
    //     },
    //     error: null,
    //     isLoading: false,
    //   };
    // }
    return state;
  }),

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
  on(TaskApiActions.updateTaskSuccess, (state, action): SelectedBoardState => {
    // if (state.board) {
    //   const column = state.board.columns.find((c) => c.id === action.column.id);
    //   if (column) {
    //     column.title = action.column.title;
    //     column.order = action.column.order;

    //     return {
    //       board: {
    //         ...state.board,
    //       },
    //       error: null,
    //       isLoading: false,
    //     };
    //   }
    //   return state;
    // }
    return state;
  }),

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
  on(TaskApiActions.deleteTaskSuccess, (state, action): SelectedBoardState => {
    // if (state.board) {
    //   const colIndex = state.board.columns.findIndex((c) => c.id === action.id);
    //   return {
    //     board: {
    //       ...state.board,
    //       columns: [...columns],
    //     },
    //     error: null,
    //     isLoading: false,
    //   };
    // }
    return state;
  }),
);
