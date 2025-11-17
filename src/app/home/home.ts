import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatButton],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

   baseUrl = 'http://localhost:4200'


  meere = [
    {
      name: 'Atlantik',
      path: `${this.baseUrl}/home`
    },
    {
      name: 'Indik',
      path: `${this.baseUrl}/home`,
    },
    {
      name: 'Pazifik',
      path: `${this.baseUrl}/home`
    },
    {
      name: 'Artik',
      path: `${this.baseUrl}/home`
    },
    {
      name: 'Antartik',
      path: `${this.baseUrl}/home`
    }
  ]


}
