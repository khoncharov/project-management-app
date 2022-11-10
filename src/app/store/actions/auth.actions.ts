import { createAction, props } from '@ngrx/store';
import { CreateUserDto, SignInUserDto } from '../../core/models/user.model';

export const loginUser = createAction(
  '[Login Page] Sign-in user',
  props<{ user: SignInUserDto }>(),
);

export const registerUser = createAction(
  '[Registration Page] Sign-up new user',
  props<{ user: CreateUserDto }>(),
);

// TODO: do we need this?
export const logoutUser = createAction('[Header] Sign-out user');

// TODO: Token
export const checkTokenExist = createAction('[Token] Check token exist');

export const checkTokenExpired = createAction('[Token] Check token expired');
