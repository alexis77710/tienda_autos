import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { Global } from '../../services/global';

@Component({
  selector: 'app-art1',
  standalone: true, // Angular 19+: Indica que el componente no necesita un NgModule
  imports: [CommonModule], // Importamos esto para poder usar *ngFor, *ngIf o pipes en el HTML
  templateUrl: './art1.component.html',
  styleUrl: './art1.component.css',
  providers: [ProductoService] // Cargamos una instancia del servicio solo para este componente
})
export class Art1Component implements OnInit {
  
  // Array vacío donde guardaremos los autos que lleguen del backend
  public productos: Producto[] = [];
  // URL base de la API (ej: http://localhost:3700/api/) para construir las rutas de las imágenes
  public url: string;

  constructor(
    // Inyección de dependencias: Traemos el servicio para poder usar sus métodos
    private _productoService: ProductoService
  ) {
    this.url = Global.url; // Asignamos la URL global a la propiedad de la clase
  }

  // ngOnInit se ejecuta automáticamente apenas carga el componente
  ngOnInit(): void {
    this.getAutos(); // Inmediatamente pedimos los autos
  }

  // Método personalizado para llamar al servicio
  getAutos() {
    // Nos suscribimos al observable (esperamos la respuesta asíncrona)
    this._productoService.getProductos().subscribe({
      next: (response) => {
        // Si la respuesta trae la propiedad 'productos'
        if (response.productos) {
          
          // AQUÍ OCURRE LA MAGIA:
          // Llenamos nuestro array local 'this.productos' con los datos de la BD.
          // El HTML detectará este cambio y actualizará el carrusel automáticamente.
          this.productos = response.productos; 

          // Tip pro: Si es un carrusel, quizás no quieras mostrar TODOS los autos.
          // Podrías limitar a los últimos 5 así:
          // this.productos = response.productos.slice(0, 5);
        }
      },
      error: (error) => {
        // Si falla la conexión o el backend da error, lo vemos aquí
        console.log(error);
      }
    });
  }
}