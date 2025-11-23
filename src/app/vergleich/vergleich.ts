import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeerDto } from '../meer/meer.dto';
import { TierDto } from '../tier/tier.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { MeerService } from '../meer/meer.service';

@Component({
  selector: 'app-vergleich',
  imports: [],
  templateUrl: './vergleich.html',
  styleUrl: './vergleich.css',
})
export class Vergleich implements OnInit {


  route = inject(ActivatedRoute)
  activeOcean: string| null = null 
  activeOzeanId: number = 0
  selectedMeer!: MeerDto
  activeTierId: number = 0
  selectedTier!: TierDto
  meerObservable!: Observable<MeerDto>
  meerService = inject(MeerService)
  source: string = ''
  typ!: string;

  ngOnInit(): void {




    this.route.queryParams.subscribe( params => {
      this.source = params['source']

          /*
      this.activeOzeanId = params['oceanId']
      this.getMeer(this.activeOzeanId)

      if(this.source == 'tier'){
        this.activeTierId =  params['tierId']
        this.getTier(this.activeTierId)
      }     */
      
    })
 
    
  }
  

  private async getMeer(id: number){
    this.meerObservable = this.meerService.getMeerById(id);
    this.selectedMeer = await lastValueFrom(this.meerObservable)
  }

  getTier( id: number){
    this.selectedTier = this.selectedMeer.tiere.filter( t => t.id == id)[0]
  }







}
