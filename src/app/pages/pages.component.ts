import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import {NbAuthService, NbTokenService} from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { PagesMenu } from './pages-menu';
import { InitUserService } from '../@theme/services/init-user.service';
import {UserStore} from '../@core/stores/user.store';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnDestroy {

  menu: NbMenuItem[];
  alive: boolean = true;

  constructor(
    // private pagesMenu: PagesMenu,
    private tokenService: NbTokenService,
    protected initUserService: InitUserService,
    protected userService: UserStore,
    protected nbAuthService: NbAuthService,
  ) {
    this.initMenu();
    /**
     * Marks when the user token is changed and reinits menu if so (For dynamic menu, etc.)
     */
    this.tokenService.tokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.initMenu();
      });
  }

  /**
   * Initializes side menu with data in pages-menu.ts
   */
  initMenu() {
    PagesMenu.getMenu()
      .pipe(takeWhile(() => this.alive))
      .subscribe(menu => {
        this.menu = menu;
      });
  }

  /**
   * Marks when not alive
   */
  ngOnDestroy(): void {
    this.alive = false;
  }
}
