import { createReducer, on } from '@ngrx/store';

import { Board } from '../../core/models/board.model';
import * as BoardActions from '../actions/board.actions';
import * as BoardApiActions from '../actions/board-api.actions';

export interface ProjectsState {
  boards: Board[];
  isLoading: boolean;
  error: string | null;
}

const initState: ProjectsState = {
  boards: [],
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

  on(
    BoardActions.removeProjectsError,
    (state): ProjectsState => ({
      ...state,
      error: null,
    }),
  ),

  on(BoardActions.getBoards, onDataRequest),
  on(BoardActions.createBoard, onDataRequest),
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
    BoardApiActions.deleteBoardSuccess,
    (state, action): ProjectsState => ({
      ...state,
      boards: action.boards,
      error: null,
      isLoading: false,
    }),
  ),
  on(BoardApiActions.updateBoardSuccess, (state, action): ProjectsState => {
    const boards = state.boards.map((board) => {
      if (board.id === action.board.id) {
        return action.board;
      }
      return board;
    });
    return {
      ...state,
      boards,
      error: null,
      isLoading: false,
    };
  }),
);
