import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-meer',
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './meer.html',
  styleUrl: './meer.css',
})
export class Meer implements OnInit {

  route = inject(ActivatedRoute)
  activeOzean: string | null = null

  ngOnInit(): void {
    this.activeOzean = this.route.snapshot.paramMap.get('ozean');
  }

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
