import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../../core/models';

@Pipe({
  name: 'sortBoardsByTitle',
})
export class SortBoardsByTitlePipe implements PipeTransform {
  transform(boards: Board[] | null): Board[] | null {
    if (boards) {
      const list = [...boards];

      return list.sort((a, b) => {
        const title1 = a.title;
        const title2 = b.title;

        if (title1 < title2) {
          return -1;
        }
        if (title1 > title2) {
          return 1;
        }
        return 0;
      });
    }
    return boards;
  }
}
