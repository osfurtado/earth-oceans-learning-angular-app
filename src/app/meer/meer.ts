import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { MeerDetails } from './meer-details/meer-details';

@Component({
  selector: 'app-meer',
  imports: [MatToolbarModule, MatButtonModule, RouterOutlet, RouterLinkWithHref],
  templateUrl: './meer.html',
  styleUrl: './meer.css',
})
export class Meer implements OnInit {

  route = inject(ActivatedRoute)
  activeOzean: string | null = null

  router = inject(Router)


  ngOnInit(): void {
    this.activeOzean = this.route.snapshot.paramMap.get('ozean');
  }

  onOceanClick(event: string){
    this.activeOzean = event
    //this.router.navigate([`${this.activeOzean}`])
  }


  meere = [
    {
      id: 2,
      path: 'atlantik'
    },
    {
      id: 3,
      path: 'indik',
    },
    {
      id: 1,
      path: 'pazifik'
    },
    {
      id: 5,
      path: 'artik'
    },
    {
      id: 4,
      path: 'antartik'
    }
  ]




}
