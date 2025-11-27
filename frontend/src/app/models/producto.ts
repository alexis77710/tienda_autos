export class Producto {
  constructor(
    public _id: string,
    public marca: string,
    public modelo: string,
    public anio: number,        // En lugar de RAM
    public kilometraje: string, // En lugar de ROM
    public precio: number,
    public imagen: string,
  ){}
}