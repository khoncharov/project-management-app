import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import * as fromCurrentUser from '../../../store/selectors/current-user.selectors';
import * as AuthActions from '../../../store/actions/user.actions';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  public editForm!: FormGroup;

  private currentUserSubscription!: Subscription;

  protected user$!: Observable<User>;

  protected error$!: Observable<string | null>;

  protected isLoading$!: Observable<boolean>;

  private currentUser!: User;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select(fromCurrentUser.selectUser);

    this.error$ = this.store.select(fromCurrentUser.selectLoginError);

    this.isLoading$ = this.store.select(fromCurrentUser.selectLoginProgress);

    this.createForm();

    this.currentUserSubscription = this.user$.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.editForm.patchValue({
          name: user.name,
          login: user.login,
          password: '',
        });
      }
    });
  }

  createForm() {
    this.editForm = this.fb.group({
      name: new FormControl('', {
        validators: [Validators.required],
      }),
      login: new FormControl('', {
        validators: [Validators.required],
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
        ],
      }),
    });
  }

  editProfile() {
    if (this.editForm.valid) {
      this.store.dispatch(
        AuthActions.updateUser({
          id: this.currentUser.id,
          user: this.editForm.value,
        }),
      );
    }
  }

  deleteProfile() {
    this.store.dispatch(
      AuthActions.deleteUser({
        id: this.currentUser.id,
      }),
    );
    this.router.navigateByUrl('/home');
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
