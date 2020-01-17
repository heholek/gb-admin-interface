import { Component, OnInit } from '@angular/core';
import {circle, latLng, marker, tileLayer, polyline, Layer} from 'leaflet';

@Component({
  selector: 'ngx-gb-map',
  templateUrl: './gb-map.component.html',
  styleUrls: ['./gb-map.component.scss'],
})
export class GbMapComponent implements OnInit {
  options = {
    layers: [
      tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          { maxZoom: 20, attribution: '...' }),
    ],
    zoom: 20,
    center: latLng(38.586114, -121.351503),
  };

  layers: Layer[] = [
  ];
  drawOptions = {
    position: 'topright',
    draw: {
      rectangle: false,
    },
  };

  constructor() { }

  ngOnInit() { }

  public handleDrawEvents(event) {
    // console.log(event);
    this.layers.push(event.layer);
    // console.log(this.layers);
    // console.log(event.layer.editing.latlngs);
  }

}
