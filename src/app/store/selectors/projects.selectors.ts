/* eslint-disable operator-linebreak */
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProjectsState } from '../reducers/projects.reducer';

export const selectProjectsState =
  createFeatureSelector<ProjectsState>('projects');

export const selectProgress = createSelector(
  selectProjectsState,
  (state) => state.isLoading,
);

export const selectError = createSelector(
  selectProjectsState,
  (state) => state.error,
);

export const selectBoards = createSelector(
  selectProjectsState,
  (state) => state.boards,
);
