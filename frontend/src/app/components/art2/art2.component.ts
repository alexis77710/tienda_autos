import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { Global } from '../../services/global';

@Component({
  selector: 'app-art2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './art2.component.html',
  styleUrl: './art2.component.css',
  providers: [ProductoService] // Inyectamos el servicio para poder pedir datos
})
export class Art2Component implements OnInit {

  // Array que contendrá la lista de autos para generar las tarjetas (Cards)
  public productos: Producto[] = [];
  
  // Variable para guardar la URL base (ej: localhost:3700/api/)
  // La necesitamos en el HTML para pintar las fotos: <img [src]="url + ...">
  public url: string;

  constructor(
    private _productoService: ProductoService
  ) {
    this.url = Global.url; // Inicializamos la URL al arrancar
  }

  // Se ejecuta automáticamente al cargar el componente
  ngOnInit(): void {
    this.getAutos(); // Llamamos a la función que busca los datos
  }

  getAutos() {
    // Usamos el servicio para hacer la petición HTTP (GET) al backend
    this._productoService.getProductos().subscribe({
      next: (response) => {
        if (response.productos) {
          // COMENTARIO CLAVE:
          // Aunque la sección se llame "Más vendidos" o "Novedades",
          // por ahora el requerimiento es solo mostrar datos.
          // Así que llenamos el array con TODO lo que viene de la base.
          this.productos = response.productos;
          
          // Si en el futuro el inge pide filtrar, aquí harías algo como:
          // this.productos = response.productos.filter(p => p.ventas > 50);
        }
      },
      error: (error) => {
        // Si la base de datos está apagada o falla, lo vemos aquí
        console.log(error);
      }
    });
  }
}