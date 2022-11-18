import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import MaterialModule from '../shared/material/material.module';
import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { ColumnsInOrderPipe } from './pipes/columns-in-order.pipe';
import { TasksInOrderPipe } from './pipes/tasks-in-order.pipe';

@NgModule({
  declarations: [BoardPageComponent, ColumnsInOrderPipe, TasksInOrderPipe],
  imports: [CommonModule, BoardRoutingModule, MaterialModule],
})
export class BoardModule {}
