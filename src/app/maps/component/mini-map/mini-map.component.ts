import { Component, ElementRef, input, signal, viewChild } from '@angular/core';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map|null>(null);
  lngLat = input.required<{ lng: number; lat: number }>();
  zoom = input.required<number>();

  ngAfterViewInit(): void {
    if( !this.divElement() ) return;
    const element = this.divElement()?.nativeElement;
    

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat(), // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      interactive: false,
      pitch: 30
    });

    new mapboxgl.Marker({
      draggable: false, 
      color: 'red'
    }).setLngLat(this.lngLat())
      .addTo(map);
  }
}
