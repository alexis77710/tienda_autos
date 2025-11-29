import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CrudComponent } from './components/crud/crud.component';

export const routes: Routes = [
  // Redirección inicial
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Páginas principales
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'contact', component: ContactComponent },
  
  // --- RUTAS DEL FORMULARIO (CRUD) ---
  // Ruta para CREAR (vacía)
  { path: 'crud', component: CrudComponent },
  
  // Ruta para EDITAR (con ID)
  { path: 'crud/:id', component: CrudComponent },
];