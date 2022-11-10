/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';

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
        return this.adminApi
          .getUser(payload.id)
          .pipe(map((user) => UserApiActions.userDataLoaded({ user })));
      }),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap((payload) => {
        return this.adminApi
          .updateUser(payload.id, payload.user)
          .pipe(map((user) => UserApiActions.updateUserSuccess({ user })));
      }),
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap((payload) => {
        return this.adminApi
          .deleteUser(payload.id)
          .pipe(map(() => UserApiActions.deleteUserSuccess()));
      }),
    );
  });
}
