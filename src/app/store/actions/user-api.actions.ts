import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const getUsersFailure = createAction(
  '[User API] Get users list failed',
  props<{ error: HttpErrorResponse }>(),
);

export const getUsersSuccess = createAction(
  '[User API] User list loaded',
  props<{ users: User[] }>(),
);

export const getUserFailure = createAction(
  '[User API] Get user data failed',
  props<{ error: HttpErrorResponse }>(),
);

export const getUserSuccess = createAction(
  '[User API] User data loaded',
  props<{ user: User }>(),
);

export const updateUserFailure = createAction(
  '[User API] Update user failed',
  props<{ error: HttpErrorResponse }>(),
);

export const updateUserSuccess = createAction(
  '[User API] User updated',
  props<{ user: User }>(),
);

export const deleteUserFailure = createAction(
  '[User API] Delete user failed',
  props<{ error: HttpErrorResponse }>(),
);

export const deleteUserSuccess = createAction('[User API] User deleted');
