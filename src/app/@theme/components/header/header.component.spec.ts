// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import {
  NbSidebarService,
  NbMenuService,
  NbThemeService,
  NbMediaBreakpointsService,
  NbThemeModule
} from '@nebular/theme';
import { UserStore } from '../../../@core/stores/user.store';
import { LayoutService } from '../../../@core/utils';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

@Injectable()
class MockUserStore {}

@Injectable()
class MockLayoutService {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let themeService: NbThemeService;
  let menuService;
  let sidebarService: NbSidebarService;
  let layoutService;
  let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, NbThemeModule.forRoot(), RouterTestingModule.withRoutes([])],
      declarations: [
        HeaderComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
          NbSidebarService,
          NbMenuService,
          NbThemeService,
          LayoutService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    themeService = fixture.debugElement.injector.get(NbThemeService);
    menuService = fixture.debugElement.injector.get(NbThemeService);
    sidebarService = fixture.debugElement.injector.get(NbSidebarService);
    layoutService = fixture.debugElement.injector.get(LayoutService);

    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should get the whole menu', () => {
    expect(component.getMenuItems()).toContain({ title: 'Log out', link: '/auth/logout' })
  });

  it('should have the current theme of cosmic', () => {
    expect(component.currentTheme).toBe ('cosmic')
  });

  it('should update the current theme to the theme service theme', () => {
    themeService.changeTheme('dark');
    fixture.detectChanges();
    expect(component.currentTheme).toBe('dark');
  });

  it('should toggle sidebar', done => {
    fixture.detectChanges();
    sidebarService.onToggle().subscribe(v => {
      expect(v).toBeDefined();
      done()
    });
    fixture.debugElement
        .query(By.css(".sidebar-toggle"))
        .triggerEventHandler('click', null);
  });

  it('should switch themes on click', done => {
    fixture.detectChanges();
    fixture.debugElement
        .query(By.css('nb-option'))
        .triggerEventHandler('click', null);
    expect(component.currentTheme).toBe('default');
    done();
  });

  // it('should have a dropdown menu for the user containing logout', () => {
  //   fixture.detectChanges();
  //   fixture.debugElement
  //       .query(By.css('nb-user'))
  //       .triggerEventHandler('click', null);
  //   const dropdown = fixture.debugElement.query(By.css('ul'));
  //   console.log(dropdown);
  //   expect(dropdown).toBeDefined();
  // });
  //
  // it('should logout user if dropdown is pressed', () => {
  //   fixture.detectChanges();
  //   // const navigateSpy= spyOn(router, 'navigate');
  //   fixture.debugElement
  //       .query(By.css('nb-user'))
  //       .triggerEventHandler('click', null);
  //   const dropdown = fixture.debugElement.query(By.css('nb-context-menu'));
  //   // expect(navigateSpy).toHaveBeenCalledWith(['/log-out']);
  // })

});
