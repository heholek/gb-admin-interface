import { Component, OnInit } from '@angular/core';
import {
  latLng,
  tileLayer,
  polyline,
  Polyline,
  LeafletMouseEvent,
  LatLng,
} from 'leaflet';
import {GbService, IGbs} from '../../../@core/backend/common/services/gb.service';

@Component({
  selector: 'ngx-gb-map',
  templateUrl: './gb-map.component.html',
  styleUrls: ['./gb-map.component.scss'],
})
export class GbMapComponent implements OnInit {
  // Map settings
  options = {
    layers: [
      tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          { maxZoom: 21, attribution: '...' }),
    ],
    zoom: 21,
    center: latLng(38.586114, -121.351503),
  };

  // Layers of Gb Paths
  gbPaths: IGbPaths = {
    gb1: polyline([[38.586114, -121.351503], [38.586216, -121.351503]], {color: 'red'}),
  };

  // Returns all the gb paths as an array instead of object for use in the leaflet map
  get getGbPathsAsArray(): Polyline[] {
    return Object.values(this.gbPaths);
  }

  editMode: boolean = false; // edit mode (new line)
  addMode: boolean = false; // add mode (add points to existing line)
  gbs: IGbs; // all of users gbs initialized in on init
  public selectedGb: string = 'gb1'; // username of which gb is selected
  public objectKeys = Object.keys;

  constructor(
      private gbService: GbService,
  ) { }

  ngOnInit() {
    // Get all the users gbs
    this.gbService.gbs.subscribe(v => {
      this.gbs = v;
      // Initialize all the gb layers
      for (const gbsKey in this.gbs) {
        // For testing, generates random path with color (will be last gb known path)
        this.gbPaths[gbsKey] = polyline([[38.586114, -121.351503 + (Math.random() / 5000)], [38.586216, -121.351503]],
            {color: this.gbs[gbsKey].color});
      }
    });
  }

  public buttonStatus(mode: boolean) {
    return (mode ? 'success' : 'danger');
  }

  public toggleEditMode() { this.editMode = !this.editMode; }

  public toggleAddMode() { this.addMode = !this.addMode; }

  private firstSelected: LatLng;
  private secondSelected: LatLng;

  public handleClick(event: LeafletMouseEvent) {
    if (this.editMode) {
      this.gbPaths[this.selectedGb].addLatLng(event.latlng);
    } else if (this.addMode) {
      this.addPolyLne(event.latlng);
    }
  }

  private addPolyLne(latlng: LatLng) {
    if (!this.firstSelected) {
      this.firstSelected = latlng;
    } else if (this.firstSelected && !this.secondSelected) {
      this.secondSelected = latlng;
      this.gbPaths[this.selectedGb] = polyline([this.firstSelected, this.secondSelected]);
      this.firstSelected = undefined;
      this.secondSelected = undefined;
      this.toggleAddMode();
    }
  }

  public existingLine(gb: string): boolean {
    return gb in this.gbPaths;
  }

  public clearPath(gb: string) {
    delete this.gbPaths[gb];
  }

  public userSelect(selectedGb: string) {
    this.selectedGb = selectedGb;
  }

  public sendAction() {
    // console.log(this.selectedGb);
  }

}

interface IGbPaths {
  [key: string]: Polyline;
}
