import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SignInUserDto, User } from 'src/app/core/models';
import { passwordValidator } from 'src/app/core/validators';

import * as AuthActions from 'src/app/store/actions/auth.actions';
import * as fromCurrentUser from 'src/app/store/selectors/current-user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    login: ['', [Validators.required]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), passwordValidator()],
    ],
  });

  isHidden = true;

  user$!: Observable<User>;

  error$!: Observable<string | null>;

  isLoading$!: Observable<boolean>;

  token$!: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.error$ = this.store.select(fromCurrentUser.selectLoginError);
    this.token$ = this.store.select(fromCurrentUser.selectToken);
    this.user$ = this.store.select(fromCurrentUser.selectUser);
  }

  getErrorMessage(error: ValidationErrors) {
    if (error['required']) return 'Please fill in this field';
    if (error['minlength']) return 'Should be at least 8 characters';
    if (error['inValidPassword']) {
      return 'Should contain at least 1 capital letter, 1 small letter and 1 number';
    }
    return '';
  }

  onSubmit() {
    const { login, password } = this.loginForm.value;
    if (login && password) {
      const user: SignInUserDto = {
        login,
        password,
      };
      this.store.dispatch(AuthActions.loginUser({ user }));

      this.error$.subscribe((error) => {
        if (error) {
          this.snackBar.open(error, 'close', {
            verticalPosition: 'top',
            panelClass: 'snack-bar-light',
          });
        }
      });

      this.token$.subscribe((token) => {
        if (token) {
          this.router.navigate(['/projects']);
        }
      });
    }
  }
}
