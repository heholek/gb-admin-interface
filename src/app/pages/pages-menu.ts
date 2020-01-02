import { NbMenuItem } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PagesMenu {

  static getMenu(): Observable<NbMenuItem[]> {
    const dashboardMenu = [
      {
        title: 'Dashboard',
        icon: 'home-outline',
        link: '/app/dashboard',
        children: undefined,
      },
    ];


    return of([...dashboardMenu]);
  }
}
