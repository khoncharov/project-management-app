import { Pipe, PipeTransform } from '@angular/core';
import { TaskShort } from '../../core/models';

@Pipe({
  name: 'tasksInOrder',
})
export class TasksInOrderPipe implements PipeTransform {
  transform(value: TaskShort[]): TaskShort[] {
    const result = [...value];
    result.sort((a, b) => a.order - b.order);
    return result;
  }
}
