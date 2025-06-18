import { Routes } from '@angular/router';
import { FullScreenMapComponent } from './pages/full-screen-map/full-screen-map.component';
import { MarkersComponent } from './pages/markers/markers.component';
import { HousesComponent } from './pages/houses/houses.component';

export const routes: Routes = [
    {
        path: 'fullscreen',
        component: FullScreenMapComponent,
        title: 'Mapa Completo'
    },
    {
        path: 'markers',
        component: MarkersComponent,
        title: 'Marcadores'
    },
    {
        path: 'houses',
        component: HousesComponent,
        title: 'Propiedades disponibles'
    },
    {
        path: '**',
        redirectTo: 'fullscreen'
    },
];
