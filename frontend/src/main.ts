import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // <--- Importamos la configuración del paso 1
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));