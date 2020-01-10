import { Injectable } from '@angular/core';
import {NbAuthService} from '@nebular/auth';
import {UserStore} from '../../../stores/user.store';

const io = require('socket.io-client');

@Injectable({
  providedIn: 'root',
})
export class GbService {

  private socket: any;

  private topicsToSubscribe = [
    'test',
    'rwheel_encoder',
    'lwheel_encoder',
    'distance_front',
    'distance_rear',
    'distance_right',
    'distance_left',
    'distance_bottom',
    'position',
    'speed',
    'angle',
    'number_of_satellites',
  ];

  constructor(
      private authService: NbAuthService,
      private userStore: UserStore,
  ) {
  }

  public listenToUserGbs() {
    if (this.authService.isAuthenticated()) {
      this.userStore.getUserGbs().forEach(gb => {
        this.listenToGbPorts(gb._id);
      });
    }
  }


  private listenToGbPorts(gbId: string) {
    this.socket = io(`http://localhost:8000/${gbId}`, {
      query: { role: 'gb', username: 'gb2', password: 'gb' },
    });
    this.topicsToSubscribe.forEach(topic => {
      this.socket.on('connection', v => {
        // console.log(v);
      });
      this.socket.on('error', v => {
        // console.log(v);
      });
      this.socket.on(topic, data => {
        // console.log(data);
      });
    });
  }
}
