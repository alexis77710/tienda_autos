import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importante para @if y pipes básicos
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { Global } from '../../services/global';

@Component({
  selector: 'app-productos',
  standalone: true,
  // IMPORTANTE: Quitamos Nav y Foot de aquí porque ya están en el AppComponent
  // Agregamos RouterLink para que funcionen los botones de Editar
  imports: [CommonModule, RouterLink], 
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {

  public productos: Producto[] = [];
  public url: string;
  public producto: Producto | null = null; // Inicializamos como null por seguridad
  public confirm: boolean = false;

  constructor(
    private _productoService: ProductoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    // 1. Cargar la lista de autos apenas entramos
    this.getProductos();

    // 2. Lógica del Inge (Rara para una lista, pero la ponemos):
    // Verifica si hay un ID en la URL para cargar un solo producto
    this._route.params.subscribe(params => {
      let id = params['id'];
      if(id){
        console.log("ID detectado:", id);
        this.getProducto(id);
      }
    });
  }

  // --- OBTENER TODOS LOS AUTOS ---
  getProductos(){
    this._productoService.getProductos().subscribe({
      next: (response) => {
        // Verificamos si la respuesta trae la propiedad 'productos'
        if(response.productos){
          this.productos = response.productos;
        } else {
            // A veces el backend devuelve el array directo, por si acaso:
            this.productos = response; 
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // --- OBTENER UN SOLO AUTO (Por si acaso) ---
  getProducto(id: string){
    this._productoService.getProducto(id).subscribe({
      next: (response) => {
        this.producto = response.producto;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // --- EL INTERRUPTOR DE BORRAR (La lógica del inge) ---
  setConfirm(confirm: boolean){
    this.confirm = confirm;
  }

  // --- BORRAR EL AUTO ---
  borrarProducto(id: string){
    this._productoService.deleteProducto(id).subscribe({
      next: (response) => {
        if(response.producto){
            // Truco del inge: Navegar a la misma ruta para "refrescar"
            // Aunque lo mejor sería simplemente llamar a this.getProductos() de nuevo.
            this.getProductos(); 
            this.confirm = false; // Reseteamos el botón
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}