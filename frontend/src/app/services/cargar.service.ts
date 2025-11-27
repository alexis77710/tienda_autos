import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable({
  providedIn: 'root' // <-- Le agregué esto para que no tengas líos en Angular 19
})
export class CargarService {
  
  public url: string;

  constructor() {
    this.url = Global.url;
  }

  /* Método para hacer una petición AJAX para adjuntar un archivo.
     Pasamos la URL, los posibles parámetros (en este caso array de tipo string),
     un array de archivos y el nombre del archivo de tipo string.
  */
  peticionRequest(url: string, params: Array<string>, files: Array<File>, name: string) {
    /* Esto retorna una Promesa que tiene un resolve (cuando se ha resuelto) 
       y reject (cuando no se ha resuelto).
    */
    return new Promise(function(resolve, reject) {
      
      var formData: any = new FormData(); // Simulación de formulario en un objeto
      var xhr = new XMLHttpRequest();     // xhr es sinónimo de AJAX (objeto de petición asíncrona de JS)

      // Recorremos todos los ficheros que lleguen, los adjunta al formulario con el nombre que llega
      for (var i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
      }

      // Cuando haya un cambio de estado en la petición
      xhr.onreadystatechange = function() {
        // Valores que funcionan así según AJAX
        if (xhr.readyState == 4) { // 4 significa "DONE" (completado)
          if (xhr.status == 200) { // 200 significa "OK" (éxito)
            // Si es exitoso se ejecuta la resolución de la promesa
            resolve(JSON.parse(xhr.response));
          } else {
            // Caso contrario rechaza
            reject(xhr.response);
          }
        }
      }

      // Realizamos la petición AJAX por método POST y true para que sea asíncrona
      xhr.open('POST', url, true);
      
      // Envío el formulario o los datos
      xhr.send(formData);

    });
  }
}