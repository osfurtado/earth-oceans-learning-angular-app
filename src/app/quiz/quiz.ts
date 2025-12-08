import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { MeerService } from '../meer/meer.service';
import { AsyncPipe } from '@angular/common';
import { Frage, Option, QuizDto } from './quiz.dto';
import { MatAnchor } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';


interface QuizAntwortenVervolgung extends Frage {
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
  router = inject(Router)
  meerService = inject(MeerService)


  activeOzeanId: number = 0
  quiz!: QuizDto
  quizObservable!: Observable<QuizDto>
  

  quizAntwortenVervolgung: QuizAntwortenVervolgung[] = []
  activeFrage!: QuizAntwortenVervolgung
  toggleValue: any
  activeFrageIndex: number = 0
  anzahlBeantwortet = 0
  quizBeenden = false


  anzahlRichtig: number = 0
  anzahlFalsch: number = 0


  

  async ngOnInit() {
    this.route.queryParams.subscribe( params => {
      this.activeOzeanId = params['oceanId']
      
    })


    this.quizObservable = this.meerService.getQuizVonMeer(this.activeOzeanId);
    this.quiz  = await lastValueFrom(this.quizObservable)


    this.quiz.frage.forEach( f => {


      this.quizAntwortenVervolgung.push(
        {
          id: f.id,
          frageText: f.frageText,
          frageBildUrl: f.frageBildUrl,
          optionen: f.optionen,
          beantwortet: false,
          richtig: null,
          selectedOptionId: null
        }
      )
    })    
    this.activeFrage = this.quizAntwortenVervolgung[this.activeFrageIndex]
  }

  onOptionClick(op: Option){
    if(this.activeFrage.beantwortet){return}
    
    this.quizAntwortenVervolgung[this.activeFrageIndex].beantwortet = true
    this.quizAntwortenVervolgung[this.activeFrageIndex].selectedOptionId = op.id
    if(op.istRichtig){this.quizAntwortenVervolgung[this.activeFrageIndex].richtig = true} 
    else{this.quizAntwortenVervolgung[this.activeFrageIndex].richtig = false}

    this.activeFrage = this.quizAntwortenVervolgung[this.activeFrageIndex]
    this.anzahlBeantwortet++
  }

  onFrageNummerClick(frageIndex: number){
    this.toggleValue = null
    this.activeFrageIndex = frageIndex
    this.activeFrage = this.quizAntwortenVervolgung[this.activeFrageIndex]
  }

  onWeiterClick(){
    this.toggleValue = null
    this.activeFrageIndex++
    this.activeFrage = this.quizAntwortenVervolgung[this.activeFrageIndex]
  }

  onQuizEndeClick(){
    this.quizBeenden = true
    this.anzahlRichtig = this.quizAntwortenVervolgung.filter(f => f.richtig).length
    this.anzahlFalsch = this.quizAntwortenVervolgung.length - this.anzahlRichtig
  }


  async onWiederholungClick(){

      this.toggleValue = null
      this.quizBeenden = false
      this.anzahlBeantwortet = 0
      this.anzahlRichtig = 0
      this.anzahlFalsch = 0
      this.quizAntwortenVervolgung = []


      this.quiz = await lastValueFrom(this.quizObservable)     
      this.quiz.frage.forEach( f => {
        this.quizAntwortenVervolgung.push(
          {
            id: f.id,
            frageText: f.frageText,
            frageBildUrl: f.frageBildUrl,
            optionen: f.optionen,
            beantwortet: false,
            richtig: null,
            selectedOptionId: null
          }
        )
      })
      this.activeFrageIndex = 0
      this.activeFrage = this.quizAntwortenVervolgung[this.activeFrageIndex]

  }

  onQuizExitClick(){
    const url = this.route.snapshot.pathFromRoot[1].url[0].path
    console.log('Active Ocean: ', url)
    this.router.navigate([url])
  }

  ergebnissNachricht():string{
    const anteil = (this.anzahlRichtig/this.quizAntwortenVervolgung.length)*100
    switch(true){
      case anteil>=80:
        return "Super gemacht!"
      case anteil>=50:
        return "du weißt schon sehr viel!"
      case anteil>30:
        return "nicht jeder kann alles wissen!"
      default:
        return "erzähl anderen von deinem Wissen!"
    }
  }


}
