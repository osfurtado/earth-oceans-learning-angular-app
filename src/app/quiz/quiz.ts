import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TierDto } from '../tier/tier.dto';
import { MeerDto } from '../meer/meer.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { MeerService } from '../meer/meer.service';
import { AsyncPipe, NgStyle } from '@angular/common';
import { Frage, Option, QuizDto } from './quiz.dto';
import { MatAnchor } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quiz',
  imports: [AsyncPipe, MatAnchor, MatButtonToggleModule, MatIconModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz implements OnInit{

  route = inject(ActivatedRoute)
  activeOcean: string| null = null 
  activeOzeanId: number = 0
  activeTierId: number = 0
  selectedTier!: TierDto
  selectedMeer!: MeerDto
  quiz!: QuizDto
  frage!: Frage[]

  // Quiz steuern
  geantwortet = false
  selectedOptionId: number | null = null


  meerObservable!: Observable<MeerDto>
  meerService = inject(MeerService)
  source: string = ''
  

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
    this.meerObservable = this.meerService.getMeerById(this.activeOzeanId);
    this.selectedMeer = await lastValueFrom(this.meerObservable)
    console.log('Selected Meer: ', this.selectedMeer.name)
 
    //Tier
    if(this.source == 'tier'){
      this.selectedTier = this.selectedMeer.tiere.filter( t => t.id == this.activeTierId)[0]
      console.log('Nome do animal: ',this.selectedTier.name)
    }

    //Quiz
    this.quiz = this.selectedMeer.quiz[0]
    this.frage = this.quiz.frage


  }

  onOptionClick(op: Option){
    if(this.geantwortet){return}

    this.geantwortet = true

    this.selectedOptionId = op.id

  }


}
