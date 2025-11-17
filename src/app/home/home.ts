import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [MatButton, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

   baseUrl = 'http://localhost:4200'


  meere = [
    {
      name: 'Atlantik',
      path: 'atlantik'
    },
    {
      name: 'Indik',
      path: 'indik',
    },
    {
      name: 'Pazifik',
      path: 'pazifik'
    },
    {
      name: 'Artik',
      path: 'artik'
    },
    {
      name: 'Antartik',
      path: 'antartik'
    }
  ]


}
