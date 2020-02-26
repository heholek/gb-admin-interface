import { Component, OnInit } from '@angular/core';
import {GbService, Gbs} from '../../../@core/backend/common/services/gb.service';

@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  gbs: Gbs;
  selectedGbName: string;

  get selectedGb() {
    return this.gbs[this.selectedGbName];
  }

  constructor(
      private gbService: GbService,
  ) { }

  ngOnInit() {
    // Get all of the gbs data
    this.gbService.gbs.subscribe(v => {
      this.gbs = v;
      // console.log(this.gbs);
    });
  }

  /**
   * Handles selected a new gb
   * @param selectedGb - username of gb
   */
  userSelect(selectedGb: string) {
    this.selectedGbName = selectedGb;
  }

  /**
   * Send GB over socket.io to start collecting data
   * @param event <boolean> whether toggle is enabled or not
   */
  public startDataCollection(event) {
    this.selectedGb.pubToGbActionStream('dataCollectionMode', event)
  }


}
