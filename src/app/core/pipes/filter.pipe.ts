import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Task[], query: string | null): Task[] {
    if (query && typeof query === 'string') {
      console.log(query);
      const arr = [...value];
      const txt = query.toLowerCase();
      return arr.filter(
        (task) =>
          task.order === Number(txt) ||
          task.title.toLowerCase().includes(txt) ||
          task.description.toLowerCase().includes(txt),
      );
    }
    return value;
  }
}
