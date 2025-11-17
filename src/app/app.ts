import { Component, inject, signal } from '@angular/core';
import { Home } from './home/home';



@Component({
  selector: 'app-root',
  imports: [Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ozean-project');

  // meere = ['Atlantik', 'Indik', 'Pazifik', 'Artik', 'Antartik']

 baseUrl = 'http://localhost:4200'


}
