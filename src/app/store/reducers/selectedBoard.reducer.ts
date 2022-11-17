import { createReducer, on } from '@ngrx/store';

import { BoardWithColumns, ColumnWithTasks } from '../../core/models';
import * as BoardActions from '../actions/board.actions';
import * as BoardApiActions from '../actions/board-api.actions';
import * as ColumnActions from '../actions/column.actions';
import * as ColumnApiActions from '../actions/column-api.actions';

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
);