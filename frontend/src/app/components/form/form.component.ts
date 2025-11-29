import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule],
  // Usamos template en línea para no depender de archivos externos y evitar errores
  template: `<p>Componente Form (En mantenimiento - Usar CRUD)</p>`,
  styles: [] 
})
export class FormComponent {
  // Lo dejamos vacío para que no de errores
}