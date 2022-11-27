import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const loginUserFailure = createAction(
  '[Auth API] User sign-in error',
  props<{ error: HttpErrorResponse }>(),
);

export const loginUserSuccess = createAction(
  '[Auth API] User signed-in',
  props<{ token: string }>(),
);

export const registerUserFailure = createAction(
  '[Auth API] User sign-up error',
  props<{ error: HttpErrorResponse }>(),
);

export const registerUserSuccess = createAction(
  '[Auth API] User signed-up',
  props<{ user: User }>(),
);
