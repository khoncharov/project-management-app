import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Board, CreateBoardDto } from '../../../core/models/board.model';
import * as BoardActions from '../../../store/actions/board.actions';
import * as fromProjects from '../../../store/selectors/projects.selectors';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit, OnDestroy {
  protected boards$!: Observable<Board[]>;

  protected error$!: Observable<string | null>;

  private errorSub!: Subscription;

  protected isLoading$!: Observable<boolean>;

  constructor(
    private store: Store,
    private errorBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.boards$ = this.store.select(fromProjects.selectBoards);
    this.error$ = this.store.select(fromProjects.selectError);
    this.isLoading$ = this.store.select(fromProjects.selectProgress);

    this.store.dispatch(BoardActions.getBoards());

    this.errorSub = this.error$.subscribe((err) => {
      if (err) {
        this.errorBar.open(err, 'Ok', {
          verticalPosition: 'top',
        });
        this.store.dispatch(BoardActions.removeProjectsError());
      }
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onOpenBoard(id: string) {
    this.store.dispatch(BoardActions.getBoard({ id }));
    this.router.navigate(['/board']);
  }

  onCreateNewBoard() {
    const board: CreateBoardDto = {
      title: 'New board',
      description: 'Describe you new board',
    };
    this.store.dispatch(BoardActions.createBoard({ board }));
  }

  onDeleteBoard(id: string) {
    this.store.dispatch(BoardActions.deleteBoard({ id }));
  }

  getIconColor(id: string): string {
    return `color: #${id.slice(0, 6)}`;
  }
}
