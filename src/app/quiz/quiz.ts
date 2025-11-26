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




interface QuizBeantwortung extends Frage {
  beantwortet: boolean;
  richtig: boolean | null;
  selectedOptionId: number | null;
}


@Component({
  selector: 'app-quiz',
  imports: [AsyncPipe, MatAnchor, MatButtonToggleModule, MatIconModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz implements OnInit{

  route = inject(ActivatedRoute)

  //Ozean Tier Quiz Daten
  activeOcean: string| null = null 
  activeOzeanId: number = 0
  activeTierId: number = 0
  selectedTier!: TierDto
  selectedMeer!: MeerDto
  quiz!: QuizDto
  meerObservable!: Observable<MeerDto>
  meerService = inject(MeerService)
  source: string = ''
  

  // Quiz steuern
  geantwortet = false
  selectedOptionId: number | null = null
  quizBeantwortung: QuizBeantwortung[] = []
  activeFrage!: QuizBeantwortung



  

  async ngOnInit() {
    this.route.queryParams.subscribe( params => {
      this.source = params['source']
      this.activeOzeanId = params['oceanId']

      if(this.source == 'tier'){      
        this.activeTierId =  params['tierId']

      }     
      
    })

    //Meer
    this.meerObservable = this.meerService.getMeerById(this.activeOzeanId);
    this.selectedMeer = await lastValueFrom(this.meerObservable)

    
 
    //Tier
    if(this.source == 'tier'){
      this.selectedTier = this.selectedMeer.tiere.filter( t => t.id == this.activeTierId)[0]

    }

    //Quiz
    this.quiz = this.selectedMeer.quiz[0]
    
    this.quiz.frage.forEach( f => {


      this.quizBeantwortung.push(
        {
          id: f.id,
          frageText: f.frageText,
          optionen: f.optionen,
          beantwortet: false,
          richtig: null,
          selectedOptionId: null
        }
      )
    })

    
    this.activeFrage = this.quizBeantwortung[0]
    console.log('Quiz Active Frage: ',this.activeFrage )


  }

  onOptionClick(op: Option){
    if(this.activeFrage.beantwortet){return}
      this.activeFrage.beantwortet = true
      this.activeFrage.selectedOptionId = op.id
      this.quizBeantwortung.filter(f => f.id === this.activeFrage.id)[0].beantwortet = true
      this.quizBeantwortung.filter(f => f.id === this.activeFrage.id)[0].selectedOptionId = op.id

      if(op.istRichtig){
        this.activeFrage.richtig = true
        this.quizBeantwortung.filter(f => f.id === this.activeFrage.id)[0].richtig = true
      } else {
        this.activeFrage.richtig = false
        this.quizBeantwortung.filter(f => f.id === this.activeFrage.id)[0].richtig = false
      }

      console.log('Quiz Active Frage: ',this.activeFrage )
      console.log('Quiz Beantwortung: ',this.quizBeantwortung )

  }

  onFrageNummerClick(frageId: number){
    this.activeFrage = this.quizBeantwortung.filter(f => f.id === frageId)[0]
    console.log('Quiz Active Frage: ',this.activeFrage )
  }


}
