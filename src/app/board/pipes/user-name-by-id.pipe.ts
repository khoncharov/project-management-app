import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../../core/models';

@Pipe({
  name: 'userNameById',
})
export class UserNameByIdPipe implements PipeTransform {
  transform(userId: string, users: User[]): string {
    const user = users.find((u) => u.id === userId);
    if (user) {
      return user.name;
    }
    return '';
  }
}
