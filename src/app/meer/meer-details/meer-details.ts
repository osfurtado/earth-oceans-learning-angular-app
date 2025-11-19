import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MeerDto } from '../meer.dto';
import { MeerService } from '../meer.service';
import { lastValueFrom, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-meer-details',
  imports: [AsyncPipe, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, RouterLink],
  templateUrl: './meer-details.html',
  styleUrl: './meer-details.css',
})
export class MeerDetails implements OnInit {

  route = inject(ActivatedRoute)
  //@Input({required: true}) meer!: number 


  selectedMeer!: MeerDto
  activeOzean: string | null = null
  activeOzeanId!: number 
  meerService = inject(MeerService)
  meerObservable!: Observable<MeerDto>


  async ngOnInit() {
    this.route.paramMap.subscribe( params => {
      this.activeOzean = params.get('ozean')
      console.log('Oceano selecionado: ', this.activeOzean)
      this.activeOzeanId = this.meere.filter(m => m.path === this.activeOzean)[0].id
      this.getMeer(this.activeOzeanId)
    })


  }

  /** 
  async ngOnChanges(changes: SimpleChanges) {
    if (changes['activeOzeanId'] && !changes['activeOzeanId'].firstChange) {
      this.getMeer(this.activeOzeanId)
    }
  }
  */
  

  private async getMeer(id: number){
    this.meerObservable = this.meerService.getMeerById(id);
    this.selectedMeer = await lastValueFrom(this.meerObservable)
    console.log('Este foi o Mar selecionado: ',this.selectedMeer)
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
