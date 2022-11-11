import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const loginUserFailure = createAction(
  '[Auth API] User sign-in error',
  props<{ error: Error }>(),
);

export const loginUserSuccess = createAction(
  '[Auth API] User signed-in',
  props<{ token: string }>(),
);

export const registerUserSuccess = createAction(
  '[Auth API] User signed-up',
  props<{ user: User }>(),
);
