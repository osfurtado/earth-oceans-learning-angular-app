import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { MeerService } from '../meer/meer.service';
import { AsyncPipe } from '@angular/common';
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
  router = inject(Router)

  //Ozean Tier Quiz Daten
  activeOcean: string| null = null 
  activeOzeanId: number = 0
  quiz!: QuizDto
  quizObservable!: Observable<QuizDto>
  meerService = inject(MeerService)
  source: string = ''
  

  // Quiz steuern
  quizBeantwortung: QuizBeantwortung[] = []
  activeFrage!: QuizBeantwortung
  toggleValue: any
  activeFrageIndex: number = 0
  anzahlBeantwortet = 0
  quizBeenden = false

  //Quiz Ergegnis
  anzahlRichtig: number = 0
  anzahlFalsch: number = 0


  

  async ngOnInit() {
    this.route.queryParams.subscribe( params => {
      this.activeOzeanId = params['oceanId']
      
    })

    //Quiz Laden
    this.quizObservable = this.meerService.getQuizVonMeer(this.activeOzeanId);
    this.quiz  = await lastValueFrom(this.quizObservable)

    
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
    this.activeFrage = this.quizBeantwortung[this.activeFrageIndex]
  }

  onOptionClick(op: Option){
    if(this.activeFrage.beantwortet){return}

    this.anzahlBeantwortet = 0
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

    this.quizBeantwortung.forEach( q => {
      if(q.beantwortet){this.anzahlBeantwortet++}
    })
    console.log('Soll Quiz beenden: ', !this.quizBeenden, !(this.anzahlBeantwortet !== this.quizBeantwortung.length))
  }

  onFrageNummerClick(frageIndex: number){
    this.toggleValue = null
    this.activeFrage = this.quizBeantwortung[frageIndex]
    this.activeFrageIndex = frageIndex
  }

  onWeiterClick(){
    this.toggleValue = null
    this.activeFrageIndex++
    this.activeFrage = this.quizBeantwortung[this.activeFrageIndex]
    
    
  }

  onQuizEndeClick(){
    this.quizBeenden = true
    this.anzahlRichtig = this.quizBeantwortung.filter(f => f.richtig).length
    this.anzahlFalsch = this.quizBeantwortung.length - this.anzahlRichtig
  }

  // Quiz Ergebnis
  async onWiederholungClick(){

      // Neustarten
      this.toggleValue = null
      this.quizBeenden = false
      this.anzahlBeantwortet = 0
      this.anzahlRichtig = 0
      this.anzahlFalsch = 0
      this.quizBeantwortung = []

      //Quiz Hochladen
      this.quiz = await lastValueFrom(this.quizObservable)     
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
      this.activeFrageIndex = 0
      this.activeFrage = this.quizBeantwortung[this.activeFrageIndex]

  }

  onQuizExitClick(){
    const url = this.route.snapshot.pathFromRoot[1].url[0].path
    
    console.log('Active Ocean: ', url)

    this.router.navigate([url])
  }
  


}
