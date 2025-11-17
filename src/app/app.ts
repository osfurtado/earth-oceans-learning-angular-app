import { Component, inject, signal } from '@angular/core';
import { Home } from './home/home';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ozean-project');

  // meere = ['Atlantik', 'Indik', 'Pazifik', 'Artik', 'Antartik']

 baseUrl = 'http://localhost:4200'


}
