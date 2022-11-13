import { createReducer, on } from '@ngrx/store';

import { Board, BoardWithColumns } from '../../core/models/board.model';
import * as BoardActions from '../actions/board.actions';
import * as BoardApiActions from '../actions/board-api.actions';

export interface ProjectsState {
  boards: Board[];
  selected: BoardWithColumns | null;
  isLoading: boolean;
  error: string | null;
}

const initState: ProjectsState = {
  boards: [],
  selected: null,
  isLoading: false,
  error: null,
};

const onDataRequest = (state: ProjectsState): ProjectsState => ({
  ...state,
  error: null,
  isLoading: true,
});

export const projectsReducer = createReducer(
  initState,

  on(BoardActions.getBoards, onDataRequest),
  on(BoardActions.createBoard, onDataRequest),
  on(BoardActions.getBoard, onDataRequest),
  on(BoardActions.deleteBoard, onDataRequest),
  on(BoardActions.updateBoard, onDataRequest),

  on(
    BoardApiActions.getBoardsFailure,
    (state, action): ProjectsState => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),
  ),
  on(
    BoardApiActions.createBoardFailure,
    (state, action): ProjectsState => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),
  ),
  on(
    BoardApiActions.getBoardFailure,
    (state, action): ProjectsState => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),
  ),
  on(
    BoardApiActions.deleteBoardFailure,
    (state, action): ProjectsState => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),
  ),
  on(
    BoardApiActions.updateBoardFailure,
    (state, action): ProjectsState => ({
      ...state,
      error: action.error.message,
      isLoading: false,
    }),
  ),

  on(
    BoardApiActions.getBoardsSuccess,
    (state, action): ProjectsState => ({
      ...state,
      boards: action.boards,
      error: null,
      isLoading: false,
    }),
  ),
  on(
    BoardApiActions.createBoardSuccess,
    (state, action): ProjectsState => ({
      ...state,
      boards: [...state.boards, action.board],
      error: null,
      isLoading: false,
    }),
  ),
  on(
    BoardApiActions.getBoardSuccess,
    (state, action): ProjectsState => ({
      ...state,
      selected: action.board,
      error: null,
      isLoading: false,
    }),
  ),
  on(
    BoardApiActions.deleteBoardSuccess,
    (state, action): ProjectsState => ({
      ...state,
      boards: action.boards,
      error: null,
      isLoading: false,
    }),
  ),
  on(BoardApiActions.updateBoardSuccess, (state, action): ProjectsState => {
    const boards = state.boards.map((b) => {
      if (b.id === action.board.id) {
        return action.board;
      }
      return b;
    });
    return {
      ...state,
      boards,
      error: null,
      isLoading: false,
    };
  }),
);
