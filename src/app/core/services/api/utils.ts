import { HttpHeaders } from '@angular/common/http';

export const httpOptionsWithJson = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

export const httpOptionsWithFormData = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  }),
};
