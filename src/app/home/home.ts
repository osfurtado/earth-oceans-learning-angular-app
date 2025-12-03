import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  meere = environment.meereMenu


}
