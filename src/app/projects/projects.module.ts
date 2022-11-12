import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import MaterialModule from '../shared/material/material.module';

@NgModule({
  declarations: [ProjectsPageComponent],
  imports: [CommonModule, ProjectsRoutingModule, MaterialModule],
})
export class ProjectsModule {}
