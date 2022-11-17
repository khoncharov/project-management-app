/* eslint-disable operator-linebreak */
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SelectedBoardState } from '../reducers/selectedBoard.reducer';

export const selectCurrentBoardState =
  createFeatureSelector<SelectedBoardState>('selectedBoard');

export const selectProgress = createSelector(
  selectCurrentBoardState,
  (state) => state.isLoading,
);

export const selectError = createSelector(
  selectCurrentBoardState,
  (state) => state.error,
);

export const selectBoard = createSelector(
  selectCurrentBoardState,
  (state) => state.board,
);
