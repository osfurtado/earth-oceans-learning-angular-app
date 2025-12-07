import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeerDto } from '../meer/meer.dto';
import { TierDto } from '../tier/tier.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { MeerService, TierWithOcean } from '../meer/meer.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListOption } from '@angular/material/list';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-vergleich',
  imports: [AsyncPipe, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './vergleich.html',
  styleUrl: './vergleich.css',
})
export class Vergleich implements OnInit {


  route = inject(ActivatedRoute)
  router = inject(Router)
  activeOzeanId: number = 0
  selectedMeer1!: MeerDto
  selectedMeer2!: MeerDto
  activeTierId: number = 0
  selectedTier1!: TierDto
  selectedTier2!: TierWithOcean
  meerObservable!: Observable<MeerDto[]>
  tierObservable!: Observable<TierWithOcean[]>
  meerService = inject(MeerService)
  meere!:MeerDto[]
  tiere!: TierWithOcean[] 
  source: string = ''
  typ!: string;
  

  async ngOnInit() {
    this.route.queryParams.subscribe( params => {
      this.source = params['source']
      this.activeOzeanId = params['oceanId']

      if(this.source == 'tier'){      
        this.activeTierId =  params['tierId']
        console.log('Source: Tier ', this.activeTierId)
      }     
      
    })


    this.meerObservable = this.meerService.getAlleMeere();
    this.meere = await lastValueFrom(this.meerObservable)
    this.tierObservable = this.meerService.getAlleTiere()
    this.tiere = await lastValueFrom(this.tierObservable)
    this.selectedMeer1 = this.meere.filter(m => m.id == this.activeOzeanId)[0]
    this.selectedMeer2 = this.meere[0]
    console.log('Selected Meer: ', this.selectedMeer1.name)
 

    if(this.source == 'tier'){
      this.selectedTier1 = this.tiere.filter( t => t.id == this.activeTierId && t.ozean == this.selectedMeer1.name)[0]
      this.selectedTier2 = this.tiere[0]
    }

  }

  onZurueck(){
    if(this.source == 'ocean'){
      this.router.navigate([environment.meereMenu.filter(o => o.id == this.activeOzeanId)[0].path])
    } else{
      this.router.navigate([environment.meereMenu.filter(o => o.id == this.activeOzeanId)[0].path, 'tiere'])
    }
  }


}
