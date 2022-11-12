import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Board } from '../../../core/models/board.model';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit {
  protected boards$!: Observable<Board[]>;

  protected error$!: Observable<string | null>;

  protected isLoading$!: Observable<boolean>;

  ngOnInit(): void {
    const mock: Board[] = [
      {
        id: '1',
        title: 't1',
        description: 'd1',
      },
      {
        id: '2',
        title: 't2',
        description: 'd2',
      },
    ];

    this.boards$ = of(mock);
    this.error$ = of(null);
    this.isLoading$ = of(true);
  }
}
