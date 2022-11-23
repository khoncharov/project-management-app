import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import MaterialModule from '../shared/material/material.module';
import { BoardDialogComponent } from './components/board-dialog/board-dialog.component';

@NgModule({
  declarations: [ProjectsPageComponent, BoardDialogComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class ProjectsModule {}
