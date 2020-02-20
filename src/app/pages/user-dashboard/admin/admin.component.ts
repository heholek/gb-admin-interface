import { Component, OnInit } from '@angular/core';
import {GbService, Gbs} from '../../../@core/backend/common/services/gb.service';

@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  gbs: Gbs;
  selectedGb: string;

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
    this.selectedGb = selectedGb;
  }

  public startDataCollection() {

  }


}
