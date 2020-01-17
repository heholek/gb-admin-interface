import { Component, OnInit } from '@angular/core';
import {GbService, IGbs} from '../../../@core/backend/common/services/gb.service';

@Component({
  selector: 'ngx-gb-sensors',
  templateUrl: './gb-sensors.component.html',
  styleUrls: ['./gb-sensors.component.scss'],
})
export class GbSensorsComponent implements OnInit {

  objectKeys = Object.keys;
  gbs: IGbs;
  dataStreams: any;
  data = {};
  subscriber = {};

  constructor(
      private gbService: GbService,
  ) {
    this.gbService.listenToUserGbs();
    this.gbs = this.gbService.gbs;
  }

  ngOnInit() {
    // Initialize the first Gb in the set
    this.initDataStream(this.objectKeys(this.gbs)[0]);
  }

  /**
   * Handles selected a new gb
   * @param selectedGb - username of gb
   */
  userSelect(selectedGb: string) {
    this.clearSubscriptions();
    this.initDataStream(selectedGb);
  }

  /**
   * Inits the dataStream of the gb
   * @param selectedGb username
   */
  initDataStream(selectedGb: string) {
    // Sets current datastream to the selected gb datastream
    if (this.dataStreams = this.gbs[selectedGb]) {
      this.dataStreams = this.gbs[selectedGb].dataStreams;
      // Initializes subscribers
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
  }

  /**
   * Resets values subscriptions from current GB before changing to new one
   */
  clearSubscriptions() {
    for (const key in this.subscriber) {
      this.data[key] = undefined;
      this.subscriber[key].unsubscribe();
    }
  }


}

