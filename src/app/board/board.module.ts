import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import MaterialModule from '../shared/material/material.module';
import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './components/board-page/board-page.component';

@NgModule({
  declarations: [BoardPageComponent],
  imports: [CommonModule, BoardRoutingModule, MaterialModule],
})
export class BoardModule {}
