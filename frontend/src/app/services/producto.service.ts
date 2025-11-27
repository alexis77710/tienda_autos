import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto'; // Importamos tu modelo de Auto
import { Global } from './global';

@Injectable({
  providedIn: 'root' // <-- Esto es clave en Angular 19/Standalone
})
export class ProductoService {
  
  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  // 1. TEST / VERIFICAR CONEXIÓN
  testService() {
    return 'Probando el servicio de Angular';
  }

  // 2. LISTAR AUTOS (GET)
  // Pide al servidor todos los autos disponibles
  getProductos(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    // Petición AJAX al backend
    return this._http.get(this.url + 'productos', { headers: headers });
  }

  // 3. GUARDAR UN AUTO NUEVO (POST)
  // Envía los datos de un auto nuevo para guardarlo en la BD
  guardarProducto(producto: Producto): Observable<any> {
    // Convertimos el objeto auto a un texto JSON para enviarlo
    let params = JSON.stringify(producto);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'guardar-producto', params, { headers: headers });
  }

  // 4. OBTENER UN SOLO AUTO (GET con ID)
  // Sirve para ver el detalle de un auto específico
  getProducto(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + 'producto/' + id, { headers: headers });
  }

  // 5. ACTUALIZAR AUTO (PUT)
  // Sirve para editar datos (ej: cambiar el precio de un auto)
  updateProducto(producto: Producto): Observable<any> {
    let params = JSON.stringify(producto);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Aquí usamos producto._id para saber cuál actualizar
    return this._http.put(this.url + 'producto/' + producto._id, params, { headers: headers });
  }

  // 6. ELIMINAR AUTO (DELETE)
  // Borra el auto de la base de datos
  deleteProducto(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url + 'producto/' + id, { headers: headers });
  }

}