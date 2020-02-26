import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserStore } from '../../../@core/stores/user.store';
import {TeleopService} from '../../../@core/utils/teleop.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); // Notes when the subject is destroyed
  user: any; // User that is being displayed

  // Themes for the UI modes
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'cosmic';

  // UserMenu object
  userMenu = this.getMenuItems();

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userStore: UserStore,
              private layoutService: LayoutService,
              private teleopService: TeleopService) {
  }

  // Gets menu items for the user dropdown
  getMenuItems() {
    return [
      { title: 'Log out', link: '/auth/logout' },
    ];
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme; // Sets theme
    this.user = this.userStore.getUser(); // Sets user to user form database
    this.userMenu = this.getMenuItems(); // Gets user information from menu


    /**
     * Tracks when the theme is changed, and sets the new theme when it is
     */
    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  /**
   * Marks function as complete
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Sets theme to User Database and changes is
   * @param themeName
   */
  changeTheme(themeName: string) {
    this.userStore.setSetting(themeName);

    this.themeService.changeTheme(themeName);
  }

  /**
   * Toggles sidebar
   */
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  /**
   * Navigates home
   */
  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  selectGb(gb: string) {
    this.teleopService.publishTeleop(gb);
  }
}
