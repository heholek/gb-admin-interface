import {Injectable, OnInit} from '@angular/core';
import {Update, User} from '../interfaces/common/users';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStore implements OnInit {
  private user: User;
  private updates: Subject<Update[]>;

  ngOnInit(): void {
    this.setUser(JSON.parse(localStorage.getItem('gbUser')));
  }

  constructor() {
    this.updates = new Subject();
  }

  getUser(): User {
      return this.user;
  }

  setUser(paramUser: User) {
      localStorage.setItem('gbUser', JSON.stringify(paramUser));
      this.user = paramUser;
  }

  setUpdates(paramUpdates: Update[]) {
    this.updates.next(paramUpdates);
  }

  getUpdates(): Subject<Update[]> {
    return this.updates;
  }

  setSetting(themeName: string) {
    if (this.user) {
      if (this.user.settings) {
        this.user.settings.themeName = themeName;
      } else {
        this.user.settings = { themeName: themeName };
      }
    }
  }
}
