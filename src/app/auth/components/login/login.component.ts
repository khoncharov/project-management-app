import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SignInUserDto } from 'src/app/core/models';
import { passwordValidator } from 'src/app/core/validators';

import * as AuthActions from 'src/app/store/actions/auth.actions';
import * as fromCurrentUser from 'src/app/store/selectors/current-user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription2$!: Subscription;

  loginForm!: FormGroup;

  isHidden = true;

  token$!: Observable<string>;

  isLoading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.isLoading$ = this.store.select(fromCurrentUser.selectLoginProgress);
    this.token$ = this.store.select(fromCurrentUser.selectToken);

    this.subscription2$ = this.token$.subscribe((token) => {
      if (token) {
        this.router.navigate(['/projects']);
      }
    });
  }

  login() {
    const { login, password } = this.loginForm.value;
    if (login && password) {
      const user: SignInUserDto = {
        login,
        password,
      };
      this.store.dispatch(AuthActions.loginUser({ user }));
    }
  }

  ngOnDestroy(): void {
    this.subscription2$.unsubscribe();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), passwordValidator()],
      ],
    });
  }
}
