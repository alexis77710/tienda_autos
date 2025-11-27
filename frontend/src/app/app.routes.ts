import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductosComponent } from './components/productos/productos.component';
// 1. IMPORTANTE: Importamos el componente del formulario
import { FormComponent } from './components/form/form.component'; 

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  { path: 'home', component: HomeComponent },
  
  // Catálogo de autos
  { path: 'productos', component: ProductosComponent },
  
  // Contacto
  { path: 'contacto', component: ContactComponent },
  
  // --- RUTAS DEL FORMULARIO (CRUD) ---
  
  // 2. Ruta para CREAR (Cuando das clic en "Agregar Nuevo Auto")
  { path: 'form', component: FormComponent },

  // 3. Ruta para EDITAR (Cuando das clic en "Editar" un auto específico)
  { path: 'form/:id', component: FormComponent },
];