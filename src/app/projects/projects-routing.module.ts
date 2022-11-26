import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: ProjectsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
