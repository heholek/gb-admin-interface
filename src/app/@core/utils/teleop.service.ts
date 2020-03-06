import { Injectable } from '@angular/core';
import {Gbs, GbService} from '../backend/common/services/gb.service';

@Injectable({
  providedIn: 'root',
})
export class TeleopService {

  x; // Integer from -1 to 1. forward backwards speed
  z; // Integer from -1 to 1, rotation speed
  defaultFace: boolean;
  angerFace: boolean;
  happyFace: boolean;
  siren: boolean;
  enableMovement: boolean = true;

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

  private boolToInt(state: boolean): number {
    return state ? 1 : 0;
  }

  private resetFaces() {
    this.defaultFace = false;
    this.angerFace = false;
    this.happyFace = false;
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
        this.x = 0.5 * speed;
        break;
      case 68:
      case 39:
        // turn right
        this.z = -1 * speed;
        break;
      case 83:
      case 40:
        // down
        this.x = -0.5 * speed;
        break;
      case 48:
        this.siren = !this.siren;
        break;
      case 49:
        this.resetFaces();
        this.defaultFace = !this.defaultFace;
        break;
      case 50:
        this.resetFaces();
        this.happyFace = !this.happyFace;
        break;
      case 51:
        this.resetFaces();
        this.angerFace = !this.angerFace;
        break;
      default:
        pub = false;
    }

    // publish the command
    if (pub === true) {
      const rosObject = {
        axes: [this.z, this.x, 0, 0, 0, 0, 0],
        buttons: [
          this.boolToInt(this.angerFace), this.boolToInt(this.siren), this.boolToInt(this.enableMovement), 0,
          this.boolToInt(this.defaultFace), this.boolToInt(this.happyFace)],
      };

      // check for changes
      this.gbs[this.selectedGb].pubToGbActionStream('joy', rosObject);
    }
  }

}
