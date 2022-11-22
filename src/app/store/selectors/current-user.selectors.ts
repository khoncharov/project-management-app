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

export const selectToken = createSelector(
  selectCurrUserState,
  (state) => state.token.token,
);

export const selectUser = createSelector(
  selectCurrUserState,
  (state) => state.user,
);

export const selectUserId = createSelector(
  selectCurrUserState,
  (state) => state.user.id,
);
