import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import MaterialModule from '../shared/material/material.module';
import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { ColumnsInOrderPipe } from './pipes/columns-in-order.pipe';
import { TasksInOrderPipe } from './pipes/tasks-in-order.pipe';
import { TaskComponent } from './components/task/task.component';
import { ColumnComponent } from './components/column/column.component';
import { UserNameByIdPipe } from './pipes/user-name-by-id.pipe';

@NgModule({
  declarations: [
    BoardPageComponent,
    ColumnsInOrderPipe,
    TasksInOrderPipe,
    TaskComponent,
    ColumnComponent,
    UserNameByIdPipe,
  ],
  imports: [CommonModule, BoardRoutingModule, MaterialModule],
})
export class BoardModule {}
