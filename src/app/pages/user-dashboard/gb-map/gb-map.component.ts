import { Component, OnInit } from '@angular/core';
import {latLng, tileLayer} from 'leaflet';

@Component({
  selector: 'ngx-gb-map',
  templateUrl: './gb-map.component.html',
  styleUrls: ['./gb-map.component.scss'],
})
export class GbMapComponent implements OnInit {
  options = {
    layers: [
      tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 40,
    center: latLng(38.586114, -121.351503),
  };
  constructor() { }

  ngOnInit() {
  }

}
