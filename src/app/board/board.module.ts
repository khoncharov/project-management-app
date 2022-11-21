import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import MaterialModule from '../shared/material/material.module';
import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { ColumnsInOrderPipe } from './pipes/columns-in-order.pipe';
import { TasksInOrderPipe } from './pipes/tasks-in-order.pipe';
import { TaskComponent } from './components/task/task.component';
import { ColumnComponent } from './components/column/column.component';
import { UserNameByIdPipe } from './pipes/user-name-by-id.pipe';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { ColumnDialogComponent } from './components/column-dialog/column-dialog.component';

@NgModule({
  declarations: [
    BoardPageComponent,
    ColumnsInOrderPipe,
    TasksInOrderPipe,
    TaskComponent,
    ColumnComponent,
    UserNameByIdPipe,
    TaskDialogComponent,
    ColumnDialogComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MaterialModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BoardModule {}
