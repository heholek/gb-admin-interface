import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersApi } from '../api/users.api';
import { UserData, User } from '../../../interfaces/common/users';
import {Gb} from '../../../interfaces/common/gb';
import {UserStore} from '../../../stores/user.store';

@Injectable()
export class UsersService extends UserData {

  constructor(
      private api: UsersApi,
      private userStore: UserStore,
  ) {
    super ();
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<User[]> {
    return this.api.list(pageNumber, pageSize);
  }

  getUserGbs(id?: string): Observable<Gb[]> {
    // console.log("Getting user gb");
    if (id !== undefined) {
      return this.api.getUserGbs(id);
    } else {
      return this.api.getUserGbs(this.userStore.getUser()._id);
    }
  }

  get(id: string): Observable<User> {
    return this.api.get(id);
  }

  create(user: any): Observable<User> {
    return this.api.add(user);
  }

  update(user: any): Observable<User> {
    return this.api.update(user);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }
}
