/* eslint-disable operator-linebreak */
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CurrentUserState } from '../reducers/auth.reducer';

export const selectCurrUserState =
  createFeatureSelector<CurrentUserState>('currentUser');

export const selectLoginProgress = createSelector(
  selectCurrUserState,
  (state) => state.page.isLoading,
);

export const selectLoginError = createSelector(
  selectCurrUserState,
  (state) => state.page.error,
);
