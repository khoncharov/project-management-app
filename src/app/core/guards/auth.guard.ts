import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromCurrentUser from '../../store/selectors/current-user.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnDestroy {
  private token$!: Observable<string>;

  private token!: string;

  private sub1!: Subscription;

  constructor(private router: Router, private store: Store) {
    this.token$ = this.store.select(fromCurrentUser.selectToken);

    this.sub1 = this.token$.subscribe((t) => {
      this.token = t;
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  canActivate(): true | UrlTree {
    if (this.token) {
      return true;
    }

    return this.router.parseUrl('/auth/login');
  }
}
