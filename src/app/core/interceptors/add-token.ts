import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { tap, Observable } from 'rxjs';

import * as fromCurrentUser from '../../store/selectors/current-user.selectors';

const getAccessToken = (token: string) => (token ? `Bearer ${token}` : '');

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
  private token = '';

  constructor(private store: Store) {
    this.store
      .select(fromCurrentUser.selectToken)
      .pipe(
        tap((token) => {
          this.token = token;
        }),
      )
      .subscribe();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const TOKEN = getAccessToken(this.token);

    return next.handle(
      req.clone({
        headers: req.headers.set('Authorization', TOKEN),
      }),
    );
  }
}
