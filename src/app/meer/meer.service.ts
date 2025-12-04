import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeerDto } from './meer.dto';
import { map, Observable } from 'rxjs';
import { TierDto } from '../tier/tier.dto';
import { environment } from '../../environments/environment.development';
import { QuizDto } from '../quiz/quiz.dto';


export interface TierWithOcean extends TierDto{
  ozean: string;
}

@Injectable({
  providedIn: 'root',
})
export class MeerService {
  
  http = inject(HttpClient)




  public getMeerById(meerId: number): Observable<MeerDto> {
    return this.http.get<MeerDto>(`${environment.api}/${meerId}`)
  }

  public getAllMeere(): Observable<MeerDto[]> {
    return this.http.get<MeerDto[]>(environment.api)
  }


  getAllTiere():Observable<TierWithOcean[]>{
    const tiere = []
    return this.http.get<MeerDto[]>(environment.api).pipe(
      map( data => {
        
        return data.reduce((acc, item) => {
          const ozean = item.name
          const tiere = item.tiere.map( t => ({...t, ozean: ozean }))
          return acc.concat(tiere)
        }, [] as TierWithOcean[])
      })
    )
  }

  getAlleTiereVonMeer(meerId: number):Observable<TierDto[]>{
    return this.http.get<MeerDto>(`${environment.api}/${meerId}`).pipe(
      map( data => {
        return data.tiere
      })
    )
  }

  getQuizVonMeer(meerId: number):Observable<QuizDto>{
    return this.http.get<MeerDto>(`${environment.api}/${meerId}`).pipe(
      map( data => {
        return data.quiz[0]
      })
    )
  }


}
