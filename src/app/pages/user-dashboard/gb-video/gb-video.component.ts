import { Component, OnInit } from '@angular/core';
import {Gbs, GbService} from '../../../@core/backend/common/services/gb.service';

@Component({
  selector: 'ngx-gb-video',
  templateUrl: './gb-video.component.html',
  styleUrls: ['./gb-video.component.scss'],
})
export class GbVideoComponent implements OnInit {

  gbs: Gbs;
  videoStreamIp: string;

  get imageSourceIp() {
    return 'http://' + this.videoStreamIp + ':8080/stream?topic=/camera/camera/image_mono';
  }

  constructor(
      private gbService: GbService,
  ) { }

  ngOnInit() {
    this.gbService.gbs.subscribe(gbs => {
      this.gbs = gbs;
    });
  }

  selectGb(gb: string) {
    this.videoStreamIp = this.gbs[gb].ip;
  }

}
