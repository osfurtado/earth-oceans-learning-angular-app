import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MeerDetails } from './meer-details/meer-details';
import { MeerDto } from './meer.dto';
import { MeerService } from './meer.service';

@Component({
  selector: 'app-meer',
  imports: [MatToolbarModule, MatButtonModule, MeerDetails],
  templateUrl: './meer.html',
  styleUrl: './meer.css',
})
export class Meer implements OnInit {

  route = inject(ActivatedRoute)
  activeOzean: string | null = null
  router = inject(Router)
  selectedMeer!: MeerDto
  meerService = inject(MeerService)

  ngOnInit(): void {
    this.activeOzean = this.route.snapshot.paramMap.get('ozean');
  }

  onOceanClick(event: string){
    this.activeOzean = event
    this.router.navigate([`${this.activeOzean}`])
    
  }

  baseUrl = 'http://localhost:4200'

  meere = [
    {
      id: 2,
      name: 'Atlantik',
      path: 'atlantik'
    },
    {
      id: 3,
      name: 'Indik',
      path: 'indik',
    },
    {
      name: 'Pazifik',
      path: 'pazifik'
    },
    {
      id: 5,
      name: 'Artik',
      path: 'artik'
    },
    {
      id: 2,
      name: 'Antartik',
      path: 'antartik'
    }
  ]

}
