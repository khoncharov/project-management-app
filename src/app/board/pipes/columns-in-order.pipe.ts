import { Pipe, PipeTransform } from '@angular/core';
import { ColumnWithTasks } from '../../core/models';

@Pipe({
  name: 'columnsInOrder',
})
export class ColumnsInOrderPipe implements PipeTransform {
  transform(value: ColumnWithTasks[]): ColumnWithTasks[] {
    const result = [...value];
    result.sort((a, b) => a.order - b.order);
    return result;
  }
}
