import { Component, OnInit } from '@angular/core';
import {
  circle,
  latLng,
  marker,
  tileLayer,
  polyline,
  Layer,
  Polyline,
  LeafletEvent,
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
  options = {
    layers: [
      tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          { maxZoom: 21, attribution: '...' }),
    ],
    zoom: 21,
    center: latLng(38.586114, -121.351503),
  };

  polyLineLayers: IGbPaths = {
    gb1: polyline([[38.586114, -121.351503], [38.586216, -121.351503]]),
  };

  get polyLineLayersAsArray(): Polyline[] {
    return Object.values(this.polyLineLayers);
  }

  editMode: boolean = false;
  addMode: boolean = false;
  gbs: IGbs;
  selectedGb: string = 'gb1';
  objectKeys = Object.keys;

  constructor(
      private gbService: GbService,
  ) {
  }

  ngOnInit() {
    this.gbs = this.gbService.gbs;
  }

  public buttonStatus(mode: boolean) {
    return (mode ? 'success' : 'danger');
  }

  public toggleEditMode() {
    this.editMode = !this.editMode;
  }

  public toggleAddMode() {
    this.addMode = !this.addMode;
  }

  private firstSelected: LatLng;
  private secondSelected: LatLng;

  public handleClick(event: LeafletMouseEvent) {
    if (this.editMode) {
      this.polyLineLayers.gb1.addLatLng(event.latlng);
    } else if (this.addMode) {
      this.addPolyLne(event.latlng);
    }
  }

  private addPolyLne(latlng: LatLng) {
    if (!this.firstSelected) {
      this.firstSelected = latlng;
    } else if (this.firstSelected && !this.secondSelected) {
      this.secondSelected = latlng;
      this.polyLineLayers[this.selectedGb] = polyline([this.firstSelected, this.secondSelected]);
      this.firstSelected = undefined;
      this.secondSelected = undefined;
      this.toggleAddMode();
    }
  }

  public existingLine(gb: string): boolean {
    return gb in this.polyLineLayers;
  }

  public clearPath(gb: string) {
    delete this.polyLineLayers[gb];
  }

  public userSelect(selectedGb: string) {
    this.selectedGb = selectedGb;
  }

}

interface IGbPaths {
  [key: string]: Polyline;
}
