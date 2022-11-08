import { ColumnWithTasks } from './column.model';

export interface Board {
  id: string;
  title: string;
  description: string;
}

export interface BoardWithColumns extends Board {
  columns: ColumnWithTasks;
}

export interface CreateBoardDto {
  title: string;
  description: string;
}

export interface UpdateBoardDto {
  title: string;
  description: string;
}
