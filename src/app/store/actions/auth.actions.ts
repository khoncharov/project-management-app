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

export const logoutUser = createAction('[Header] Sign-out user');

export const checkToken = createAction('[Token] Check token');
