import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map  } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [ AsyncPipe, RouterLink ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
   router = inject( Router );

   routes = routes
   .filter((route) => route.path !== '**')
   .map( route => ({
     path: route.path,
     title: `${route.title ?? 'Mapas en angular'}`
   }));

   pageTitle$ = this.router.events.pipe(
    filter( event => event instanceof NavigationEnd),  
    map( event => event.url ),
    map( url => routes.find(route => `/${ route.path }` === url )?.title ??  'Mapas' )
   );
}
