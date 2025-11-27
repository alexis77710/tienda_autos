import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para @if y ngClass
import { FormsModule, NgForm } from '@angular/forms'; // OBLIGATORIO para usar [(ngModel)]
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CargarService } from '../../services/cargar.service';
import { Producto } from '../../models/producto';
import { Global } from '../../services/global';

@Component({
  selector: 'app-form',
  standalone: true,
  // Importamos FormsModule para que funcionen los formularios
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  // Si usaste 'providedIn: root' en los servicios, esta línea de providers sobra, pero la dejo por si acaso
  providers: [ProductoService, CargarService] 
})
export class FormComponent implements OnInit {

  public titulo: string;
  public producto: Producto; // El auto que vamos a manipular
  public url: string;
  public status: string = '';
  public archivosParaCargar: Array<File> = [];

  constructor(
    private _productoService: ProductoService,
    private _cargarService: CargarService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.titulo = "Registro de Vehículo";
    this.url = Global.url;
    
    // Inicializamos el auto vacío (ADAPTADO A TU MODELO DE AUTOS)
    // _id, marca, modelo, anio, kilometraje, precio, imagen
    this.producto = new Producto('', '', '', 0, '', 0, '');
  }

  ngOnInit(): void {
    // Verificamos si llegamos aquí para EDITAR (hay ID en la URL)
    this._route.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.titulo = "Editar Vehículo";
        this.getProducto(id);
      }
    });
  }

  // --- OBTENER DATOS PARA EDITAR ---
  getProducto(id: string){
    this._productoService.getProducto(id).subscribe({
      next: (response) => {
        if(response.producto){
          this.producto = response.producto;
        } else {
          // Si no existe el auto, nos regresamos al listado
          this._router.navigate(['/productos']);
        }
      },
      error: (error) => {
        console.log(error);
        this._router.navigate(['/productos']);
      }
    });
  }

  // --- GUARDAR (CREAR O EDITAR) ---
  guardarProducto(form: NgForm){
    
    // ¿Es un auto nuevo o uno viejo?
    // Si tiene ID, es editar. Si no, es guardar nuevo.
    /* NOTA: En el código del inge llama directo a update, 
       pero aquí lo hacemos dinámico para que sirva para los dos casos */
    
    // Referencia a la función que vamos a usar (save o update)
    let peticion; 

    if(this.producto._id){
       // Si ya tiene ID, actualizamos
       peticion = this._productoService.updateProducto(this.producto);
    } else {
       // Si no tiene ID, creamos uno nuevo
       peticion = this._productoService.guardarProducto(this.producto);
    }

    // Ejecutamos la petición seleccionada
    peticion.subscribe({
      next: (response) => {
        if(response.producto){
          
          // --- AQUÍ VIENE LA MAGIA DE SUBIR LA IMAGEN ---
          if(this.archivosParaCargar.length > 0){
            
            // Subimos la imagen usando el ID del producto que acabamos de guardar/editar
            this._cargarService.peticionRequest(
              this.url + 'subir-imagen/' + response.producto._id, 
              [], 
              this.archivosParaCargar, 
              'imagen'
            ).then((result: any) => {
                
                console.log("Imagen subida con éxito");
                this.status = 'success';
                this._router.navigate(['/productos']); // Nos vamos al listado
            
            }).catch(error => {
                console.log("Error subiendo imagen", error);
            });

          } else {
            // Si no subió imagen, igual guardamos y salimos
            this.status = 'success';
            this._router.navigate(['/productos']);
          }

        } else {
          this.status = 'failed';
        }
      },
      error: (error) => {
        console.log(error);
        this.status = 'failed';
      }
    });
  }

  // --- DETECTAR EL ARCHIVO SELECCIONADO ---
  imagenChangeEvent(archivoSeleccionado: any){
    // Esto captura el archivo del input type="file" y lo guarda en la variable
    this.archivosParaCargar = <Array<File>>archivoSeleccionado.target.files;
  }
}