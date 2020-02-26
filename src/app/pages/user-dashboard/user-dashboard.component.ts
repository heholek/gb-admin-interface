import {Component, OnInit} from '@angular/core';
import {UserStore} from '../../@core/stores/user.store';

@Component({
  selector: 'ngx-user-dashboard',
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent implements OnInit {

  private role: string;
  x;
  y;
  z;

  constructor(
      private userStore: UserStore,
  ) { }

  ngOnInit() {
    this.role = this.userStore.getUser().role;
  }

  public get isAdmin() {
    return (this.role === 'admin');
  }
}
