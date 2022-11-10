import { createAction, props } from '@ngrx/store';
import { UpdateUserDto } from '../../core/models/user.model';

export const getUser = createAction(
  '[User profile] Get user data',
  props<{ id: string }>(),
);

export const updateUser = createAction(
  '[User profile] Update user',
  props<{ id: string; user: UpdateUserDto }>(),
);

export const deleteUser = createAction(
  '[User profile] Delete user',
  props<{ id: string }>(),
);
