import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Board, CreateBoardDto } from '../../../core/models/board.model';
import * as BoardActions from '../../../store/actions/board.actions';
import * as fromProjects from '../../../store/selectors/projects.selectors';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit {
  protected boards$!: Observable<Board[]>;

  protected error$!: Observable<string | null>;

  protected isLoading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.boards$ = this.store.select(fromProjects.selectBoards);

    this.error$ = this.store.select(fromProjects.selectError);

    this.isLoading$ = this.store.select(fromProjects.selectProgress);

    this.store.dispatch(BoardActions.getBoards());
  }

  onError() {
    this.store.dispatch(BoardActions.removeError());
  }

  onOpenBoard(id: string) {
    this.store.dispatch(BoardActions.getBoard({ id }));
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
