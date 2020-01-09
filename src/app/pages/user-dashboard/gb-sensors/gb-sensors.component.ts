import { Component, OnInit } from '@angular/core';
import {GbService} from '../../../@core/backend/common/services/gb.service';

@Component({
  selector: 'ngx-gb-sensors',
  templateUrl: './gb-sensors.component.html',
  styleUrls: ['./gb-sensors.component.scss'],
})
export class GbSensorsComponent implements OnInit {

  constructor(
      private gbService: GbService,
  ) { }

  ngOnInit() {
  }

}
