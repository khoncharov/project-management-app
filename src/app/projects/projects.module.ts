import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import MaterialModule from '../shared/material/material.module';
import { BoardDialogComponent } from './components/board-dialog/board-dialog.component';
import { SortBoardsByTitlePipe } from './pipes/sort-boards-by-title.pipe';

@NgModule({
  declarations: [
    ProjectsPageComponent,
    BoardDialogComponent,
    SortBoardsByTitlePipe,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class ProjectsModule {}
