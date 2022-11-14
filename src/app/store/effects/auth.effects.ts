/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { AuthApiService } from '../../core/services/api/auth-api.service';
import * as AuthActions from '../actions/auth.actions';
import * as AuthApiActions from '../actions/auth-api.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authApi: AuthApiService) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginUser),
      mergeMap((payload) => {
        return this.authApi.signIn(payload.user).pipe(
          map(({ token }) => AuthApiActions.loginUserSuccess({ token })),
          catchError((error) => of(AuthApiActions.loginUserFailure({ error }))),
        );
      }),
    );
  });

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.registerUser),
      mergeMap((payload) => {
        return this.authApi.signUp(payload.user).pipe(
          map((user) => AuthApiActions.registerUserSuccess({ user })),
          catchError((error) =>
            of(AuthApiActions.registerUserFailure({ error })),
          ),
        );
      }),
    );
  });
}
