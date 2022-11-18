import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateUserDto, User } from 'src/app/core/models';
import {
  confirmPasswordValidator,
  passwordValidator,
} from 'src/app/core/validators';

import * as AuthActions from 'src/app/store/actions/auth.actions';
import * as fromCurrentUser from 'src/app/store/selectors/current-user.selectors';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = this.fb.group(
    {
      name: ['', Validators.required],
      login: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(8), passwordValidator()],
      ],
      confirmPassword: ['', Validators.required],
    },
    { validator: confirmPasswordValidator('password', 'confirmPassword') },
  );

  isHidden = true;

  user$!: Observable<User>;

  error$!: Observable<string | null>;

  isLoading$!: Observable<boolean>;

  token$!: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.error$ = this.store.select(fromCurrentUser.selectLoginError);
    this.isLoading$ = this.store.select(fromCurrentUser.selectLoginProgress);
    this.token$ = this.store.select(fromCurrentUser.selectToken);
    this.user$ = this.store.select(fromCurrentUser.selectUser);
  }

  getErrorMessage(error: ValidationErrors) {
    if (error['required']) return 'Please fill in this field';
    if (error['minlength']) return 'Should be at least 8 characters';
    if (error['inValidPassword']) {
      return 'Should contain at least 1 capital letter, 1 small letter and 1 number';
    }
    if (error['mustMatch']) return 'Passwords do not match';
    return '';
  }

  onSubmit() {
    const { name, login, password } = this.signUpForm.value;
    if (name && login && password) {
      const user: CreateUserDto = {
        name,
        login,
        password,
      };

      this.store.dispatch(AuthActions.registerUser({ user }));
    }
  }
}
