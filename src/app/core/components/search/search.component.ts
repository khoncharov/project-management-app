import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  startWith,
  map,
  Subscription,
} from 'rxjs';
import { Task } from 'src/app/core/models';
import * as BoardActions from 'src/app/store/actions/board.actions';
import { TaskSearchService } from '../../services/api/task-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private taskSubscription = new Subscription();

  search = new FormControl('');

  tasks: Task[] = [];

  tasksList$!: Observable<Task[]>;

  constructor(
    private store: Store,
    private router: Router,
    private searchService: TaskSearchService,
  ) {}

  ngOnInit() {
    this.getAllTasks();
    this.tasksList$ = this.search.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || '')),
    );
  }

  ngOnDestroy(): void {
    this.taskSubscription.unsubscribe();
  }

  displayTask(task: Task) {
    return task ? `${task.order} ${task.title} ${task.description}` : '';
  }

  onOpenBoardWithTask(id: string) {
    this.search.setValue('');
    this.store.dispatch(BoardActions.getBoard({ id }));
    this.router.navigate(['/board']);
  }

  private getAllTasks() {
    this.taskSubscription = this.searchService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  private filter(value: string): Task[] {
    const filterValue = value.toLowerCase();

    return this.tasks.filter(
      (task) => task.order === Number(filterValue)
        || task.title.toLowerCase().includes(filterValue)
        || task.description.toLowerCase().includes(filterValue),
    );
  }
}
