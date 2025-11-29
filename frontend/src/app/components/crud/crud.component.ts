// IMPORTS: Traemos las herramientas necesarias de Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas como @if, @for
import { FormsModule, NgForm } from '@angular/forms'; // OBLIGATORIO para formularios template-driven ([(ngModel)])
import { Router, ActivatedRoute } from '@angular/router'; // Para navegar entre páginas y leer la URL
// SERVICIOS: Nuestros "mensajeros" con el Backend
import { ProductoService } from '../../services/producto.service';
import { CargarService } from '../../services/cargar.service';
// MODELOS: La estructura de nuestros datos
import { Producto } from '../../models/producto';
import { Global } from '../../services/global';

// DECORADOR: Define que esta clase es un Componente de Angular
@Component({
  selector: 'app-crud', // Nombre para usarlo como etiqueta HTML <app-crud>
  standalone: true,     // Indica que es un componente independiente (Angular 19 style)
  // IMPORTS LOCALES: Qué necesita ESTE componente para funcionar
  imports: [CommonModule, FormsModule], 
  templateUrl: './crud.component.html', // Su cara (HTML)
  styleUrl: './crud.component.css',     // Su maquillaje (CSS)
  providers: [ProductoService, CargarService] // Servicios que provee (opcional si son root, pero bueno ponerlo)
})
export class CrudComponent implements OnInit {

  // PROPIEDADES (Variables de la clase)
  public titulo: string;          // Título dinámico (Nuevo o Editar)
  public producto: Producto;      // El objeto que vamos a llenar con el formulario
  public productoGuardar: Producto; // Copia del producto guardado
  public url: string;             // URL del backend
  public status: string = '';     // Estado para mostrar mensajes (success/failed)
  public archivosParaCargar: Array<File> = []; // Array para guardar la foto seleccionada
  
  // @ViewChild: Nos permite "agarrar" un elemento del HTML por su ID (#archivoImagen)
  // Lo usamos para limpiar el input de archivo después de guardar
  @ViewChild('archivoImagen') fileInput: any;

  // CONSTRUCTOR: Se ejecuta al crear el componente. Inyectamos servicios aquí.
  constructor(
    private _productoService: ProductoService,
    private _cargarService: CargarService,
    private _router: Router,        // Para movernos de página
    private _route: ActivatedRoute  // Para saber en qué página estamos (leer ID)
  ){
    this.titulo = "Registro de Vehículo";
    this.url = Global.url;
    
    // Inicializamos el objeto vacío para que el formulario no de error al cargar.
    // IMPORTANTE: Los campos deben coincidir con tu modelo (anio, kilometraje, etc.)
    this.producto = new Producto('', '', '', 2024, '', 0, '');
    this.productoGuardar = new Producto('', '', '', 2024, '', 0, '');
  }

  // NGONINIT: Se ejecuta justo después de cargar el componente. Ideal para pedir datos.
  ngOnInit(): void {
    // Escuchamos la URL para ver si hay un parámetro 'id'
    this._route.params.subscribe(params => {
      let id = params['id'];
      
      // Si existe un ID, significa que estamos en MODO EDITAR
      if(id){
        this.titulo = "Editar Vehículo"; // Cambiamos el título
        this.getProducto(id);            // Pedimos los datos de ese carro al backend
      }
    });
  }

  // MÉTODO: Obtener un solo auto (para editar)
  getProducto(id: string){
    this._productoService.getProducto(id).subscribe({
      next: (response) => {
        if(response.producto){
          this.producto = response.producto; // Llenamos el formulario con los datos del carro
        } else {
          this._router.navigate(['/productos']); // Si no existe, nos vamos
        }
      },
      error: (error) => {
        console.log(error);
        this._router.navigate(['/productos']);
      }
    });
  }

  // MÉTODO PRINCIPAL: Guardar (Crear o Editar)
  guardarProducto(form: NgForm){
    
    let peticion; 

    // LÓGICA DE DECISIÓN:
    // Si el producto ya tiene un _id, es porque ya existía -> ACTUALIZAMOS (PUT)
    if(this.producto._id){
       peticion = this._productoService.updateProducto(this.producto);
    } else {
       // Si no tiene _id, es nuevo -> CREAMOS (POST)
       peticion = this._productoService.guardarProducto(this.producto);
    }

    // Ejecutamos la petición seleccionada
    peticion.subscribe({
      next: (response) => {
        if(response.producto){
          this.productoGuardar = response.producto;

          // --- FASE 2: SUBIDA DE IMAGEN ---
          // Solo si el usuario seleccionó un archivo
          if(this.archivosParaCargar && this.archivosParaCargar.length > 0){
            
            // Usamos el servicio de Cargar para subir la foto al ID del producto
            this._cargarService.peticionRequest(
              this.url + 'subir-imagen/' + response.producto._id, 
              [], 
              this.archivosParaCargar, 
              'imagen'
            ).then((result: any) => {
                
                this.productoGuardar = result.response;
                this.status = 'success'; // Mostramos mensaje verde
                
                // REDIRECCIÓN AUTOMÁTICA: Esperamos 1 seg y vamos al listado
                setTimeout(() => {
                    this._router.navigate(['/productos']);
                }, 1000);

            }).catch(error => {
                console.log(error);
                this.status = 'failed';
            });

          } else {
            // --- CASO: SIN IMAGEN ---
            // Si no subió foto, igual el guardado de datos fue exitoso
            this.status = 'success';
            
            // REDIRECCIÓN AUTOMÁTICA
            setTimeout(() => {
                this._router.navigate(['/productos']);
            }, 1000);
          }

        } else {
          this.status = 'failed'; // Algo falló en el backend
        }
      },
      error: (error) => {
        console.log(error);
        this.status = 'failed'; // Error de conexión o servidor
      }
    });
  }

  // EVENTO: Se dispara cuando el usuario selecciona un archivo en el input
  imagenChangeEvent(archivoSeleccionado: any){
    // Guardamos el archivo en nuestra variable para enviarlo luego
    this.archivosParaCargar = <Array<File>>archivoSeleccionado.target.files;
  }
}