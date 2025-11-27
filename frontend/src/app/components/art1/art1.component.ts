import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- IMPORTANTE para que funcionen ciertas cosas básicas

// 1. Definimos una "interfaz" (un molde) para saber qué datos tiene cada slide
interface CarSlide {
  imageUrl: string;
  title: string;
  description: string;
  altText: string;
}

@Component({
  selector: 'app-art1',
  standalone: true,
  imports: [CommonModule], // Importamos CommonModule por si acaso, aunque con @for a veces no es indispensable
  templateUrl: './art1.component.html',
  styleUrl: './art1.component.css'
})
export class Art1Component {
  
  // 2. Creamos la lista de carros para el carrusel.
  // Estoy usando imágenes de prueba de Unsplash. 
  // ¡Luego tú cambias estas URLs por las fotos reales de tus autos!
  carSlides: CarSlide[] = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1470&auto=format&fit=crop',
      title: 'Lujo Deportivo',
      description: 'Conoce el nuevo modelo 2025. Potencia y elegancia en cada curva.',
      altText: 'Auto deportivo rojo en carretera'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1567818735868-e71b99ab4a12?q=80&w=1470&auto=format&fit=crop',
      title: 'La Mejor SUV Familiar',
      description: 'Espacio, seguridad y tecnología para todos tus viajes.',
      altText: 'SUV azul en la ciudad'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1470&auto=format&fit=crop',
      title: 'Ofertas del Mes',
      description: 'Aprovecha nuestros planes de financiamiento con tasa 0%.',
      altText: 'Auto clásico moderno en exhibición'
    }
  ];

}