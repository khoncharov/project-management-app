import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Task } from 'src/app/core/models';
import * as BoardActions from 'src/app/store/actions/board.actions';
import { TaskSearchService } from '../../services/api/task-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  search = new FormControl('');

  tasksList$!: Observable<Task[]>;

  constructor(
    private store: Store,
    private router: Router,
    private searchService: TaskSearchService,
  ) {}

  displayTask(task: Task) {
    return task ? `${task.order} ${task.title} ${task.description}` : '';
  }

  onOpenBoardWithTask(id: string) {
    this.search.setValue('');
    this.store.dispatch(BoardActions.getBoard({ id }));
    this.router.navigate(['/board']);
  }

  getAllTasks() {
    this.searchService.getTasks();
    this.tasksList$ = of(this.searchService.tasks);
  }
}
