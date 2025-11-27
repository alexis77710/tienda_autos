import { Component } from '@angular/core';

// Definimos qué información tiene cada auto de la lista
interface CarProduct {
  name: string;
  description: string;
  price: string; // Le agregué precio porque en ventas es clave
  image: string;
}

@Component({
  selector: 'app-art2',
  standalone: true,
  imports: [], // En Angular 19, para el @for básico no necesitamos importar nada extra obligatoriamente
  templateUrl: './art2.component.html',
  styleUrl: './art2.component.css'
})
export class Art2Component {

  // Lista de los 4 autos más vendidos
  products: CarProduct[] = [
    {
      name: 'Chevrolet Spark GT',
      description: 'El rey de la ciudad. Económico, compacto y fácil de estacionar. Ideal para tu primer auto.',
      price: '$14,990',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1470&auto=format&fit=crop' // Foto de SUV grande
    },
    {
      name: 'Toyota Fortuner',
      description: 'Potencia 4x4 para cualquier terreno. Seguridad y confort para toda la familia en viajes largos.',
      price: '$45,500',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1470&auto=format&fit=crop' // Foto de SUV grande
    },
    {
      name: 'Ford F-150',
      description: 'Fuerza bruta para el trabajo pesado. Capacidad de carga superior y tecnología de punta.',
      price: '$58,000',
      image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1470&auto=format&fit=crop' // Foto de sedán
    },
    {
      name: 'Kia Cerato',
      description: 'Elegancia y rendimiento. Un sedán con diseño aerodinámico y un interior de lujo.',
      price: '$22,990',
      image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1470&auto=format&fit=crop' // Foto de sedán
    }
  ];
}