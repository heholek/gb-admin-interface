import { Injectable } from '@angular/core';
import {NbAuthService} from '@nebular/auth';
import {UserStore} from '../../../stores/user.store';
import {Observable, Subject} from 'rxjs';
import {NbToastrService} from '@nebular/theme';

const io = require('socket.io-client');

@Injectable({
  providedIn: 'root',
})
export class GbService {

  // Array of gbs with key of username
  private gbs: ILooseObject = {};

  constructor(
      private authService: NbAuthService,
      private userStore: UserStore,
      private toastrService: NbToastrService,
  ) {

  }

  // Listen to all the Gbs
  public listenToUserGbs() {
    // Check if user authenticated
    if (this.authService.isAuthenticated()) {
      this.userStore.getUserGbs().forEach(gb => {
        // Get all stored Gbs from the user and create new instance of Gb class
        this.gbs[gb.username] = new Gb(gb._id, this.toastrService);
      });
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
  private socket: any; // Socket.io instance
  private readonly _gbId: string; // id of gb

  get gbId(): string {
    return this._gbId;
  }

  constructor(
      public inputGbId: string, // Wto set id
      private toastrService: NbToastrService,
  ) {
    this._gbId = inputGbId;

    // Connect to socket stream
    this.socket = io(`http://localhost:8000/${this._gbId}`, {
      query: { role: 'gb', username: 'gb2', password: 'gb' },
    });
    this.socket.on('connect', v => {
      this.toastrService.success('Click to dismiss', `Gb ${this._gbId} connected`);
    });
    this.socket.on('error', v => {
      this.toastrService.danger(``, `Gb ${this._gbId} not connected :(`);
    });

    this.listenToGbPorts();
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
interface ILooseObject {
  [key: string]: Gb;
}
