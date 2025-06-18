
import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';

import mapboxgl, { MapMouseEvent, LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { v4 as uuid } from 'uuid';

import { environment } from '../../../environments/environment';
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapBoxMarker: mapboxgl.Marker
}

@Component({
  selector: 'app-markers',
  imports: [ JsonPipe ],
  templateUrl: './markers.component.html'
})
export class MarkersComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map|null>(null);
  markers = signal<Marker[]>([]);

  ngAfterViewInit(): void {
   if( !this.divElement() ) return;
   const element = this.divElement()?.nativeElement;
  

   const map = new mapboxgl.Map({
    container: element, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-95.3505, 29.7572], // starting position [lng, lat]
    zoom: 14, // starting zoom
   });



   this.mapListeners( map );
 }

 mapListeners( map: mapboxgl.Map ) {
   
   map.on('click', ( event ) => {
    this.mapClick( event, map )
   });

   this.map.set( map );
 }

 mapClick( event: MapMouseEvent, map: mapboxgl.Map ) {

  const color = '#xxxxxx'.replace(/x/g, (y) =>
    ((Math.random() * 16) | 0).toString(16)
  );

   const marker = new mapboxgl.Marker({
    draggable: false, 
    color: color
   }).setLngLat(event.lngLat)
     .addTo(map);

  this.markers.update(( prev ) => [{ id: uuid(), mapBoxMarker: marker }, ...prev]);

 }

 flyToMarker(lngLat : LngLatLike) {
    if(!this.map() ) return;

    this.map()?.flyTo( { center: lngLat } )
 }

 deleteMarker( marker : Marker ) {
   if(!this.map() ) return;

   marker.mapBoxMarker.remove();

   this.markers.set( this.markers().filter(( element ) => element.id !== marker.id ));


 }



 

  

}
