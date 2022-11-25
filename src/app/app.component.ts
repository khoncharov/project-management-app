import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ErrType } from './store/reducers/auth.reducer';
import * as AuthActions from './store/actions/auth.actions';
import * as BoardActions from './store/actions/board.actions';
import * as UserActions from './store/actions/user.actions';

import * as fromCurrentUser from './store/selectors/current-user.selectors';
import * as fromProjects from './store/selectors/projects.selectors';
import * as fromSelectedBoard from './store/selectors/selectedBoard.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private userId$!: Observable<string>;

  private token$!: Observable<string>;

  private errorCurrUser$!: Observable<ErrType | null>;

  private errorProjects$!: Observable<ErrType | null>;

  private errorBoard$!: Observable<ErrType | null>;

  private userId!: string;

  private subs: Subscription[] = [];

  constructor(
    private store: Store,
    private router: Router,
    private errorBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.checkToken());

    this.userId$ = this.store.select(fromCurrentUser.selectUserId);
    this.token$ = this.store.select(fromCurrentUser.selectToken);

    const subUserId = this.userId$.subscribe((id) => {
      this.userId = id;
    });
    this.subs.push(subUserId);

    const subToken = this.token$.subscribe((token) => {
      if (token && this.userId) {
        this.store.dispatch(UserActions.getUser({ id: this.userId }));
        this.router.navigate(['/projects']);
      } else {
        this.router.navigate(['/home']);
      }
    });
    this.subs.push(subToken);

    this.errorCurrUser$ = this.store.select(fromCurrentUser.selectError);
    this.errorProjects$ = this.store.select(fromProjects.selectError);
    this.errorBoard$ = this.store.select(fromSelectedBoard.selectError);

    const subErrCurrUser = this.errorCurrUser$.subscribe((err) => {
      if (err) {
        const message = `Code: ${err.code} || Message: ${err.msg} || Action: ${err.action.type}}`;
        this.errorBar.open(message, 'Ok', {
          verticalPosition: 'top',
          panelClass: 'snack-bar-light',
        });
        this.store.dispatch(AuthActions.removeCurrUserError());
      }
    });
    this.subs.push(subErrCurrUser);

    const subErrProjects = this.errorProjects$.subscribe((err) => {
      if (err) {
        const message = `Code: ${err.code} || Message: ${err.msg} || Action: ${err.action.type}}`;
        this.errorBar.open(message, 'Ok', {
          verticalPosition: 'top',
          panelClass: 'snack-bar-light',
        });
        this.store.dispatch(BoardActions.removeProjectsError());
      }
    });
    this.subs.push(subErrProjects);

    const subErrBoard = this.errorBoard$.subscribe((err) => {
      if (err) {
        const message = `Code: ${err.code} || Message: ${err.msg} || Action: ${err.action.type}}`;
        this.errorBar.open(message, 'Ok', {
          verticalPosition: 'top',
          panelClass: 'snack-bar-light',
        });
        this.store.dispatch(BoardActions.removeSelectedBoardError());
      }
    });
    this.subs.push(subErrBoard);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
