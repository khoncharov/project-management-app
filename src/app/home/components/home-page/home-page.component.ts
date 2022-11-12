import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  CreateUserDto,
  SignInUserDto,
  User,
} from '../../../core/models/user.model';

import * as AuthActions from '../../../store/actions/auth.actions';
import * as fromCurrentUser from '../../../store/selectors/current-user.selectors';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  protected userName = new FormControl('');

  protected userLogin = new FormControl('');

  protected userPassword = new FormControl('');

  protected user$!: Observable<User>;

  protected error$!: Observable<string | null>;

  protected isLoading$!: Observable<boolean>;

  protected token$!: Observable<string>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.error$ = this.store.select(fromCurrentUser.selectLoginError);
    this.isLoading$ = this.store.select(fromCurrentUser.selectLoginProgress);
    this.token$ = this.store.select(fromCurrentUser.selectToken);
    this.user$ = this.store.select(fromCurrentUser.selectUser);

    // this.token$.subscribe((token) => {
    //   const isTokenExist = Boolean(token);
    //   if (isTokenExist) {
    //     this.router.navigate(['/projects']);
    //   } else {
    //     this.router.navigate(['/home']);
    //   }
    // });
  }

  onSignUp(): void {
    const name = this.userName.value;
    const login = this.userLogin.value;
    const password = this.userPassword.value;

    if (login && password && name) {
      const user: CreateUserDto = {
        name,
        login,
        password,
      };

      this.store.dispatch(AuthActions.registerUser({ user }));
    }
  }

  onSignIn(): void {
    const login = this.userLogin.value;
    const password = this.userPassword.value;

    if (login && password) {
      const user: SignInUserDto = {
        login,
        password,
      };

      this.store.dispatch(AuthActions.loginUser({ user }));
    }
  }

  onSignOut(): void {
    this.store.dispatch(AuthActions.logoutUser());
  }
}
