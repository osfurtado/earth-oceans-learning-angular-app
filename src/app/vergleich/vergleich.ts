import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeerDto } from '../meer/meer.dto';
import { TierDto } from '../tier/tier.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { MeerService } from '../meer/meer.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-vergleich',
  imports: [AsyncPipe, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './vergleich.html',
  styleUrl: './vergleich.css',
})
export class Vergleich implements OnInit {


  route = inject(ActivatedRoute)
  activeOcean: string| null = null 
  activeOzeanId: number = 0
  selectedMeer1!: MeerDto
  selectedMeer2!: MeerDto
  activeTierId: number = 0
  selectedTier1!: TierDto
  selectedTier2!: TierDto
  meerObservable!: Observable<MeerDto[]>
  meerService = inject(MeerService)
  meere!:MeerDto[] 
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

    //Meer
    this.meerObservable = this.meerService.getAllMeere();
    this.meere = await lastValueFrom(this.meerObservable)
    this.selectedMeer1 = this.meere.filter(m => m.id == this.activeOzeanId)[0]
    this.selectedMeer2 = this.meere[0]
    console.log('Selected Meer: ', this.selectedMeer1.name)
 
    //Tier
    if(this.source == 'tier'){
      this.selectedTier1 = this.selectedMeer1.tiere.filter( t => t.id == this.activeTierId)[0]
      this.selectedTier2 = this.selectedMeer1.tiere[0]
      console.log('Nome do animal: ',this.selectedTier1.name)
    }

  }


  onMeerChange(optionen:MatListOption[]){
    console.log(optionen)
  }









}
