import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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
export class SignUpComponent implements OnInit, OnDestroy {
  private subscription2$!: Subscription;

  signUpForm!: FormGroup;

  isHidden = true;

  user$!: Observable<User>;

  isLoading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.isLoading$ = this.store.select(fromCurrentUser.selectLoginProgress);
    this.user$ = this.store.select(fromCurrentUser.selectUser);

    this.subscription2$ = this.user$.subscribe((user) => {
      if (user.id) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  signUp() {
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

  ngOnDestroy(): void {
    this.subscription2$.unsubscribe();
  }

  private createForm(): void {
    this.signUpForm = this.fb.group(
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
  }
}
