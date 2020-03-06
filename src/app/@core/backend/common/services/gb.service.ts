import { Injectable } from '@angular/core';
import {NbAuthService} from '@nebular/auth';
import {UserStore} from '../../../stores/user.store';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {NbToastrService} from '@nebular/theme';
import {environment} from '../../../../../environments/environment';

const io = require('socket.io-client');

@Injectable({
  providedIn: 'root',
})
export class GbService {

  // Array of gbs with key of username
  private _gbs: BehaviorSubject<Gbs> = new BehaviorSubject<Gbs>({});

  /**
   * Returns all the users gbs
   * @returns Observable<Gbs>
   */
  get gbs(): Observable<Gbs> {
    return this._gbs.asObservable();
  }

  constructor(
      private authService: NbAuthService,
      private userStore: UserStore,
      private toastrService: NbToastrService,
  ) {

  }

  // Listen to all the Gbs
  public listenToUserGbs() {
    // Check if user authenticated
    if (this.authService.isAuthenticated() && this.userStore.getUserGbs()) {
      // tslint:disable-next-line:prefer-const
      let newObject: Gbs = {};
      this.userStore.getUserGbs().forEach(gb => {
        // Get all stored Gbs from the user and create new instance of Gb class
        newObject[gb.username] = new Gb(gb._id, gb.username, gb.color, gb.ip, this.toastrService);
      });
      this._gbs.next(newObject);
    }
  }
}

/**
 * Describes each Garbage Byte with all of its data and initializes it
 */
class Gb {

  /**
   * All available ROS data streams
   */
  public dataStreams = {
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

  socket; // Socket.io instance

  constructor(
      public id: string, // Wto set id
      public username: string,
      public color: string, // color of the gb on the map
      public ip: string,
      private toastrService: NbToastrService,
  ) {
    const socketUrl = environment.socketUrl;

    // Connect to socket stream
    this.socket = io(`${socketUrl}/${this.id}`, {
      query: { role: 'gb', username: 'gb1', password: 'gb' },
    });
    this.socket.on('error', v => {
      this.toastrService.danger(`${this.id} `, `Gb not connected :(`);
    });
    this.socket.on('connect', v => {
      this.toastrService.success(`${this.id}`, `Gb connected`);
      this.listenToGbPorts();
    });

  }

  /**
   * Go through all the datakeys and create data listeners publishing to each subject in datastreams
   */
  private listenToGbPorts() {
    for (const dataStreamsKey in this.dataStreams) {
      // Check if dataStreamsKey exists on this.datastream
      if (this.dataStreams.hasOwnProperty(dataStreamsKey)) {
        // Subscribe to data from socket.io stream
        this.socket.on(this.dataStreams[dataStreamsKey].key, data => {
          // Update key in datastreams object
          this.dataStreams[dataStreamsKey].updateData(data);
        });
      }
    }
  }

  /**
   * Publish data to gb action stream
   * @param actionType <string> - the type of action being sent
   * @param data: any message you want to send, normally rostopic
   * @param channel <string> Optional channel to publish to for socket. Default action
   */
  public pubToGbActionStream(actionType: string, data: any, channel: string = 'action') {
    // console.log(data);
    this.socket.emit(channel, {type: actionType, data: data}, t => {
      // console.log(t);
    });
  }
}

/**
 * Interface for keeping track of each datastream on the Gb
 */
class GbDataStreams<T> {

  private _key: string;
  private _data: Subject<T>;

  get key(): string {
    return this._key;
  }

  // Return data as observable
  get data(): Observable<T> {
    return this._data.asObservable();
  }

  constructor(key: string) {
    this._key = key;
    this._data = new Subject();
  }

  // Update the subject
  public updateData(data: T) {
    this._data.next(data);
  }
}
// ROS integer interface
interface IRosNumber {
  data: number;
}
// ROS satellite interface
interface INavSatFix {
  latitude: number;
  longitude: number;
  altitude: number;
}
// Loose object for defining object of Gbs
export interface Gbs {
  [key: string]: Gb;
}
