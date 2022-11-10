import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const userDataLoaded = createAction(
  '[Auth API] User data loaded',
  props<{ user: User }>(),
);

export const updateUserSuccess = createAction(
  '[Auth API] User updated',
  props<{ user: User }>(),
);

export const deleteUserSuccess = createAction('[Auth API] User deleted');
