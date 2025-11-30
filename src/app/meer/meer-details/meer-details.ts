import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MeerDto } from '../meer.dto';
import { MeerService } from '../meer.service';
import { lastValueFrom, Observable } from 'rxjs';
import { AsyncPipe, NgStyle } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-meer-details',
  imports: [AsyncPipe, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, NgStyle],
  templateUrl: './meer-details.html',
  styleUrl: './meer-details.css',
})
export class MeerDetails implements OnInit {

  route = inject(ActivatedRoute)
  activeOzean!: MeerDto
  activeOzeanPath: string | null = null
  activeOzeanId!: number 
  meerService = inject(MeerService)
  router = inject(Router)
  meerObservable!: Observable<MeerDto>

  meere = [
    { id: 2, path: 'atlantik', name: 'Atlantik' },
    { id: 3, path: 'indik', name: 'Indik'},
    { id: 1, path: 'pazifik', name: 'Pazifik'},
    { id: 5, path: 'artik', name: 'Artik'},
    { id: 4, path: 'antarktik', name: 'Antarktik'}
  ]


  async ngOnInit() {
    this.route.paramMap.subscribe( params => {
      this.activeOzeanPath = params.get('ozean')
      this.activeOzeanId = this.meere.filter(m => m.path === this.activeOzeanPath)[0].id
      this.getMeer(this.activeOzeanId)
    })

  }

  onTierClick(){
    this.router.navigate([this.activeOzeanPath, 'tiere'])
  }

  

  private async getMeer(id: number){
    this.meerObservable = this.meerService.getMeerById(id);
    this.activeOzean = await lastValueFrom(this.meerObservable)
    
  }

  onVergleich(){
    this.router.navigate([this.activeOzeanPath ,'vergleich'], { queryParams: { source:'ocean', oceanId: this.activeOzeanId} })
  }

  onQuizClick(){
    this.router.navigate([this.activeOzeanPath ,'quiz'], { queryParams: { source:'ocean', oceanId: this.activeOzeanId} })
  }

}
