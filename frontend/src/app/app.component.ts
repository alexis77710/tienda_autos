import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <--- El lienzo mágico
import { NavComponent } from './components/nav/nav.component'; // <--- Ajusta la ruta si es necesario
import { FootComponent } from './components/foot/foot.component'; // <--- Ajusta la ruta si es necesario

@Component({
  selector: 'app-root',
  standalone: true,
  // IMPORTANTE: Aquí registras los 3 elementos que vas a usar
  imports: [RouterOutlet, NavComponent, FootComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'concesionaria-app';
}