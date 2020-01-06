import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable()
export class GbApi {
  private readonly apiController: string = 'gb';

  constructor(private api: HttpService) {}

  getAll(): Observable<any> {
    return this.api.get(`${this.apiController}`);
  }


  get(id: string): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`)
        .pipe(map(data => {
          return { ...data };
        }));
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(`${this.apiController}/${id}`);
  }

  add(item: any): Observable<any> {
    return this.api.post(this.apiController, item);
  }

  update(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/${item.id}`, item);
  }
}
