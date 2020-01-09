import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {NbAuthService} from '@nebular/auth';
// @ts-ignore
import io from 'socket.io-client';
import {UserStore} from '../../../stores/user.store';
import {Gb} from '../../../interfaces/common/gb';

@Injectable({
  providedIn: 'root',
})
export class GbService {

  constructor(
      private authService: NbAuthService,
      private userStore: UserStore,
  ) {
    if (authService.isAuthenticated()) {}
  }

  public listenToGbPorts(gbId) {

  }
}
