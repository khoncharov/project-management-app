/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { AdminApiService } from '../../core/services/api/admin-api.service';
import * as UserActions from '../actions/user.actions';
import * as UserApiActions from '../actions/user-api.actions';

@Injectable()
export class UpdateUserEffects {
  constructor(private actions$: Actions, private adminApi: AdminApiService) {}

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUser),
      mergeMap((payload) => {
        return this.adminApi.getUser(payload.id).pipe(
          map((user) => UserApiActions.getUserSuccess({ user })),
          catchError((error) => of(UserApiActions.getUserFailure({ error }))),
        );
      }),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap((payload) => {
        return this.adminApi.updateUser(payload.id, payload.user).pipe(
          map((user) => UserApiActions.updateUserSuccess({ user })),
          catchError((error) =>
            of(UserApiActions.updateUserFailure({ error })),
          ),
        );
      }),
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap((payload) => {
        return this.adminApi.deleteUser(payload.id).pipe(
          map(() => UserApiActions.deleteUserSuccess()),
          catchError((error) =>
            of(UserApiActions.deleteUserFailure({ error })),
          ),
        );
      }),
    );
  });
}
