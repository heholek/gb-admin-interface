import { Injectable } from '@angular/core';
import {Gbs, GbService} from '../backend/common/services/gb.service';

@Injectable({
  providedIn: 'root',
})
export class TeleopService {

  x;
  y;
  z;
  faceNumber;
  gbs: Gbs;
  private body: HTMLBodyElement;
  selectedGb: string;

  constructor(
      private gbService: GbService,
  ) {
    this.gbService.gbs.subscribe(gbs => {
      this.gbs = gbs;
    });
    this.body = document.getElementsByTagName('body')[0];

  }

  publishTeleop(selectedGb: string) {
    this.selectedGb = selectedGb;
    this.body.addEventListener('keydown', (event) => {
      this.handleKey(event.keyCode, true);
    });
    this.body.addEventListener('keyup', (event) => {
      this.handleKey(event.keyCode, false);
    });
  }

  private handleKey(keyCode, keyDown) {

    let pub = true;

    let speed = 0;
    // throttle the speed by the slider and throttle constant
    if (keyDown === true) {
      speed = 1;
    }

    // check which key was pressed
    switch (keyCode) {
      case 65:
      case 37:
        // turn left
        this.z = speed;
        break;
      case 87:
      case 38:
        // up
        this.x = speed;
        break;
      case 68:
      case 39:
        // turn right
        this.z = -1 * speed;
        break;
      case 83:
      case 40:
        // down
        this.x = -1 * speed;
        break;
      // Face Commands
      case 2: // '1' key
        this.faceNumber = 1;
        break;
      case 3: // '1' key
        this.faceNumber = 2;
        break;
      case 4: // '1' key
        this.faceNumber = 3;
        break;
      default:
        pub = false;
    }

    // publish the command
    if (pub === true) {
      this.sendDriveCommandTwist();
    }
  }

  private sendDriveCommandTwist() {
    const twistMessage = {
      angular: {
        x: 0,
        y: 0,
        z: this.z,
      },
      linear: {
        x: this.x,
        y: this.y,
        z: this.z,
      },
    };

    this.gbs[this.selectedGb].pubToGbActionStream('move', twistMessage);
  }

}
