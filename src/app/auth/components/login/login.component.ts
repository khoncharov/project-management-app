import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  private subscription1$ = new Subscription();

  private subscription2$ = new Subscription();

  loginForm!: FormGroup;

  isHidden = true;

  token$!: Observable<string>;

  error$!: Observable<string | null>;

  isLoading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.error$ = this.store.select(fromCurrentUser.selectLoginError);
    this.isLoading$ = this.store.select(fromCurrentUser.selectLoginProgress);
    this.token$ = this.store.select(fromCurrentUser.selectToken);
  }

  login() {
    const { login, password } = this.loginForm.value;
    if (login && password) {
      const user: SignInUserDto = {
        login,
        password,
      };
      this.store.dispatch(AuthActions.loginUser({ user }));

      this.subscription1$ = this.error$.subscribe((error) => {
        if (error) {
          this.snackBar.open(error, 'close', {
            verticalPosition: 'top',
            panelClass: 'snack-bar-light',
          });
        }
      });

      this.subscription2$ = this.token$.subscribe((token) => {
        if (token) {
          this.router.navigate(['/projects']);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe();
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
