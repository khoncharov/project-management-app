import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './components/board-page/board-page.component';

@NgModule({
  declarations: [BoardPageComponent],
  imports: [CommonModule, BoardRoutingModule],
})
export class BoardModule {}
