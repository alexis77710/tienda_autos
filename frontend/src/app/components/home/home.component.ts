import { Component } from '@angular/core';
import { Art2Component } from '../art2/art2.component';
import { Art1Component } from '../art1/art1.component';

@Component({
  selector: 'app-home',
  imports: [ Art1Component, Art2Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
