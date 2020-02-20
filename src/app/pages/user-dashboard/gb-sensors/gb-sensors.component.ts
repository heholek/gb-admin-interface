import { Component, OnInit } from '@angular/core';
import {GbService, Gbs} from '../../../@core/backend/common/services/gb.service';

@Component({
  selector: 'ngx-gb-sensors',
  templateUrl: './gb-sensors.component.html',
  styleUrls: ['./gb-sensors.component.scss'],
})
export class GbSensorsComponent implements OnInit {

  objectKeys = Object.keys; // Method to convert objects into array of keys
  gbs: Gbs; // List of Gbs
  dataStreams: any; // Datastreams from the gb
  data = {}; // Data for display
  subscriber = {}; // Object of observables to track whats online and whats offline

  constructor(
      private gbService: GbService,
  ) { }
  // TODO move dropdown initialization and data into a new component (WET CODE) and seperate logic and display
  ngOnInit() {
    // Initialize the first Gb in the set
    this.gbService.gbs.subscribe(v => {
      this.gbs = v;
    });
    if (Object.keys(this.gbs).length !== 0) {
      this.initDataStream(this.objectKeys(this.gbs)[0]);
    } else {
      this.gbs = undefined;
    }
  }

  /**
   * Handles selected a new gb
   * @param selectedGb - username of gb
   * TODO WET AF
   */
  userSelect(selectedGb: string) {
    this.clearSubscriptions();
    this.initDataStream(selectedGb);
  }

  /**
   * Inits the dataStream of the gb
   * @param selectedGb username
   */
  private initDataStream(selectedGb: string) {
    // Sets current datastream to the selected gb datastream
    if (this.gbs[selectedGb]) { // Check if the gb is stored
      this.dataStreams = this.gbs[selectedGb].dataStreams;
      // Initializes subscribers
      this.initializeDataSubscribers();
    }
  }

  /**
   * Initializes Socket subscribers for data
   */
  private initializeDataSubscribers() {
    for (const dataStreamsKey in this.dataStreams) {
      // Sets to list of subscribers for unsubcription later
      this.subscriber[dataStreamsKey] = this.dataStreams[dataStreamsKey].data.subscribe(v => {
        if (dataStreamsKey === 'position') {
          this.data[dataStreamsKey] = JSON.stringify(v);
        } else {
          this.data[dataStreamsKey] = v.data;
        }
      });
    }
  }

  /**
   * Resets values subscriptions from current GB before changing to new one
   */
  private clearSubscriptions() {
    for (const key in this.subscriber) {
      this.data[key] = undefined;
      this.subscriber[key].unsubscribe();
    }
  }


}

