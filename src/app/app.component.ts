import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AuthActions from './store/actions/auth.actions';
import * as UserActions from './store/actions/user.actions';
import * as fromCurrentUser from './store/selectors/current-user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private userId$!: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.checkToken());

    this.userId$ = this.store.select(fromCurrentUser.selectUserId);
    this.userId$.subscribe((id) => {
      this.store.dispatch(UserActions.getUser({ id }));
    });

    // TODO: initial redirect
    // TODO: unsub
  }
}
