import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const getUserFailure = createAction(
  '[User API] Get user data failed',
  props<{ error: Error }>(),
);

export const getUserSuccess = createAction(
  '[User API] User data loaded',
  props<{ user: User }>(),
);

export const updateUserFailure = createAction(
  '[User API] Update user failed',
  props<{ error: Error }>(),
);

export const updateUserSuccess = createAction(
  '[User API] User updated',
  props<{ user: User }>(),
);

export const deleteUserFailure = createAction(
  '[User API] Delete user failed',
  props<{ error: Error }>(),
);

export const deleteUserSuccess = createAction('[User API] User deleted');
