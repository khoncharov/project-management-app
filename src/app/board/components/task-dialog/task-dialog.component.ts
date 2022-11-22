/* eslint-disable object-curly-newline */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';

import { CreateTaskDto, User } from '../../../core/models';
import * as fromSelectedBoard from '../../../store/selectors/selectedBoard.selectors';
import * as fromCurrentUser from '../../../store/selectors/current-user.selectors';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit, OnDestroy {
  protected isNewTask = true;

  protected users$!: Observable<User[]>;

  protected users!: User[];

  protected currentUser$!: Observable<User>;

  protected selectedUser!: User;

  protected taskForm!: FormGroup;

  private subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: CreateTaskDto,
  ) {}

  ngOnInit(): void {
    this.users$ = this.store.select(fromSelectedBoard.selectUsers);
    this.currentUser$ = this.store.select(fromCurrentUser.selectUser);

    const sub1 = this.currentUser$.subscribe((u) => {
      this.selectedUser = u;
    });
    this.subs.push(sub1);

    const sub2 = this.users$.subscribe((users) => {
      this.users = users;
    });
    this.subs.push(sub2);

    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      userId: '',
    });
    this.taskForm.patchValue({ userId: this.selectedUser.id });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  onUserSelect(e: MatSelectChange): void {
    const selectedUserId = e.value as string;
    const selected = this.users.find((u) => u.id === selectedUserId);
    if (selected) {
      this.selectedUser = selected;
    }
  }
}
