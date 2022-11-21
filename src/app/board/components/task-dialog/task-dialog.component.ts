import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CreateTaskDto, User } from '../../../core/models';
import * as fromSelectedBoard from '../../../store/selectors/selectedBoard.selectors';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  protected task!: CreateTaskDto;

  protected isNewTask = true;

  protected users$!: Observable<User[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.users$ = this.store.select(fromSelectedBoard.selectUsers);
    this.task = {
      title: 'ti',
      description: 'des',
      userId: '000anu-id',
    };
  }
}
