import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;


@Component({
  selector: 'app-full-screen-map',
  imports: [ DecimalPipe, JsonPipe ],
  templateUrl: './full-screen-map.component.html',
  styleUrl: './full-screen-map.component.css'
})
export class FullScreenMapComponent implements AfterViewInit{
 divElement = viewChild<ElementRef>('map');
 map = signal<mapboxgl.Map|null>(null);
 zoom = signal(7);
 coords = signal({
   lng: -102.0141, 
   lat: 22.8342
 });


 zoomEffect = effect(() => {
  if( !this.map() ) return;

  this.map()?.zoomTo( this.zoom() )
  //this.map()?.setZoom( this.zoom() )
 });
 
 async ngAfterViewInit() {
   if( !this.divElement() ) return;

   const element = this.divElement()?.nativeElement;
   const {lng, lat } = this.coords();

   const map = new mapboxgl.Map({
    container: element, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [lng, lat], // starting position [lng, lat]
    zoom: this.zoom(), // starting zoom
  });

    this.mapListeners( map );
 }

 mapListeners( map: mapboxgl.Map ) {

   map.on('zoomend', ( event ) => {
      const newZoom = event.target.getZoom();
      this.zoom.set( newZoom );
   });

   map.on('moveend', ( event ) => {
      const center = map.getCenter();
      this.coords.set( center );
   }); 

   map.addControl( new mapboxgl.FullscreenControl)
   map.addControl( new mapboxgl.NavigationControl)
   map.addControl( new mapboxgl.ScaleControl)

   this.map.set( map );
 }
 
}
