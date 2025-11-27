import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router'; // withComponentInputBinding ayuda con los IDs en rutas
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http'; // <--- ESTO ES LO QUE TE FALTA

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Proveedor de Rutas
    provideRouter(routes, withComponentInputBinding()),
    
    // 2. Proveedor de HTTP (Internet para tu app)
    provideHttpClient(withFetch()) 
  ]
};