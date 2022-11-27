import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/models';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import * as fromCurrentUser from 'src/app/store/selectors/current-user.selectors';
import * as AuthActions from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  public editForm!: FormGroup;

  private currentUserSubscription!: Subscription;

  protected user$!: Observable<User>;

  protected isLoading$!: Observable<boolean>;

  private currentUser!: User;

  private confirmTitle!: string;

  private confirmMessage!: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select(fromCurrentUser.selectUser);

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
    this.getConfirmTranslate();
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: this.confirmTitle,
        message: this.confirmMessage,
      },
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;
      this.store.dispatch(
        AuthActions.deleteUser({
          id: this.currentUser.id,
        }),
      );
      this.router.navigateByUrl('/home');
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  private getConfirmTranslate(): void {
    this.translateService.get(['editUser']).subscribe((translations) => {
      this.confirmTitle = translations.editUser.confirmTitle;
      this.confirmMessage = translations.editUser.confirmMessage;
    });
  }
}
