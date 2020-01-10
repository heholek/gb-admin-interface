import { Injectable } from '@angular/core';
import {NbAuthService} from '@nebular/auth';
import {UserStore} from '../../../stores/user.store';
import {Observable, Subject} from 'rxjs';
import {GbData} from '../../../interfaces/common/gb';

const io = require('socket.io-client');

@Injectable({
  providedIn: 'root',
})
export class GbService {

  private socket: any;

  private dataStreams = {
    test: new GbDataStreams<IRosNumber>('test'),
    rWheelEncoder: new GbDataStreams<IRosNumber>('rwheel_encoder'),
    lWheelEncoder: new GbDataStreams<IRosNumber>('lwheel_encoder'),
    distanceFront: new GbDataStreams<IRosNumber>('distance_front'),
    distanceRear: new GbDataStreams<IRosNumber>('distance_rear'),
    distanceRight: new GbDataStreams<IRosNumber>('distance_right'),
    distanceLeft: new GbDataStreams<IRosNumber>('distance_left'),
    distanceBottom: new GbDataStreams<IRosNumber>('distance_bottom'),
    position: new GbDataStreams<INavSatFix>('position'),
    speed: new GbDataStreams<IRosNumber>('speed'),
    angle: new GbDataStreams<IRosNumber>('angle'),
    numberOfSatellites: new GbDataStreams<IRosNumber>('number_of_satellites'),
  };

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
    this.socket.on('connection', v => {
      // console.log(v);
    });
    this.socket.on('error', v => {
      // console.log(v);
    });
    this.socket.on('test', data => {
      // console.log(data);
    });
    for (const dataStreamsKey in this.dataStreams) {
      if (this.dataStreams.hasOwnProperty(dataStreamsKey)) {
        this.socket.on(this.dataStreams[dataStreamsKey].key, data => {
          // console.log(data);
        });
      }
    }
  }
}

class GbDataStreams<T> {

  private _key: string;
  private data: Subject<T>;

  get key(): string {
    return this._key;
  }

  constructor(key: string) {
    this._key = key;
    this.data = new Subject();
  }

  public updateData(data: T) {
    this.data.next(data);
  }
}

interface IRosNumber {
  data: number;
}

interface INavSatFix {
  latitude: number;
  longitude: number;
  altitude: number;
}
