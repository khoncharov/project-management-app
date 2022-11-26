/* eslint-disable operator-linebreak */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';

import {
  Board,
  CreateBoardDto,
  UpdateBoardDto,
} from '../../../core/models/board.model';
import * as BoardActions from '../../../store/actions/board.actions';
import * as fromProjects from '../../../store/selectors/projects.selectors';
import {
  BoardDialogComponent,
  BoardTransferData,
} from '../board-dialog/board-dialog.component';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit {
  protected boards$!: Observable<Board[]>;

  private confirmTitle!: string;

  private confirmMessage!: string;

  protected isLoading$!: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.boards$ = this.store.select(fromProjects.selectBoards);
    this.isLoading$ = this.store.select(fromProjects.selectProgress);

    this.store.dispatch(BoardActions.getBoards());
  }

  onOpenBoard(id: string) {
    this.store.dispatch(BoardActions.getBoard({ id }));
    this.router.navigate(['/board']);
  }

  onCreateNewBoard() {
    const data: BoardTransferData = {
      isNewBoard: true,
      board: {
        title: '',
        description: '',
      },
    };

    const dialogRef = this.dialog.open(BoardDialogComponent, { data });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const board = res as CreateBoardDto;
        this.store.dispatch(BoardActions.createBoard({ board }));
      }
    });
  }

  onEditBoard(board: Board): void {
    const data: BoardTransferData = {
      isNewBoard: false,
      board: {
        title: board.title,
        description: board.description,
      },
    };

    const dialogRef = this.dialog.open(BoardDialogComponent, { data });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const updatedBoard = res as UpdateBoardDto;

        const isChangedBoard =
          board.title !== updatedBoard.title ||
          board.description !== updatedBoard.description;

        if (isChangedBoard) {
          this.store.dispatch(
            BoardActions.updateBoard({ id: board.id, board: updatedBoard }),
          );
        }
      }
    });
  }

  onDeleteBoard(id: string) {
    this.getConfirmTranslate();
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: this.confirmTitle,
        message: this.confirmMessage,
      },
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;
      this.store.dispatch(BoardActions.deleteBoard({ id }));
    });
  }

  getIconColor(id: string): string {
    return `color: #${id.slice(0, 6)}`;
  }

  private getConfirmTranslate(): void {
    this.translateService.get(['projectPage']).subscribe((translations) => {
      this.confirmTitle = translations.projectPage.deleteBoard;
      this.confirmMessage = translations.projectPage.message;
    });
  }
}
