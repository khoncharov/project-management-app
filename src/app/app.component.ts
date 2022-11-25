import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as AuthActions from './store/actions/auth.actions';
import * as UserActions from './store/actions/user.actions';
import * as fromCurrentUser from './store/selectors/current-user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private userId$!: Observable<string>;

  private userId!: string;

  private token$!: Observable<string>;

  private sub1!: Subscription;

  private sub2!: Subscription;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.checkToken());

    this.userId$ = this.store.select(fromCurrentUser.selectUserId);
    this.token$ = this.store.select(fromCurrentUser.selectToken);

    this.sub1 = this.userId$.subscribe((id) => {
      this.userId = id;
    });
    this.sub2 = this.token$.subscribe((token) => {
      if (token && this.userId) {
        this.store.dispatch(UserActions.getUser({ id: this.userId }));
        this.router.navigate(['/projects']);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
