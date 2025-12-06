import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { environment } from '../../environments/environment.development';

export interface meerMenuItem { 
  id: number, 
  name: string, 
  path: string
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  meere:meerMenuItem[] = environment.meereMenu


}
