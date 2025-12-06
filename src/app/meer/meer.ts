import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { MeerDetails } from './meer-details/meer-details';
import { environment } from '../../environments/environment.development';
import { meerMenuItem } from '../home/home';

@Component({
  selector: 'app-meer',
  imports: [MatToolbarModule, MatButtonModule, RouterOutlet, RouterLinkWithHref],
  templateUrl: './meer.html',
  styleUrl: './meer.css',
})
export class Meer implements OnInit {

  route = inject(ActivatedRoute)
  router = inject(Router)
  activeOzeanPath: string | null = null
  meere:meerMenuItem[] = environment.meereMenu

  ngOnInit(): void {
    this.activeOzeanPath = this.route.snapshot.paramMap.get('ozean');
  }

  onOceanClick(ozean: string){
    this.activeOzeanPath = ozean
  }
}
