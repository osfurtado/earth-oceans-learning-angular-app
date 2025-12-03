import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeerDto } from './meer.dto';
import { map, Observable } from 'rxjs';
import { TierDto } from '../tier/tier.dto';


export interface TierWithOcean extends TierDto{
  ozean: string;
}

@Injectable({
  providedIn: 'root',
})
export class MeerService {
  
  http = inject(HttpClient)
  url: string = 'http://localhost:3000/meere'



  public getMeerById(oceanId: number): Observable<MeerDto> {
    return this.http.get<MeerDto>(`${this.url}/${oceanId}`)
  }

  public getAllMeere(): Observable<MeerDto[]> {
    return this.http.get<MeerDto[]>(this.url)
  }


  getAllTiere():Observable<TierWithOcean[]>{
    const tiere = []
    return this.http.get<MeerDto[]>(this.url).pipe(
      map( data => {
        
        return data.reduce((acc, item) => {
          const ozean = item.name
          const tiere = item.tiere.map( t => ({...t, ozean: ozean }))
          return acc.concat(tiere)
        }, [] as TierWithOcean[])
      })
    )
  }

  getAlleTiereVonOzean(oceanId: number):Observable<TierDto[]>{
    return this.http.get<MeerDto>(`${this.url}/${oceanId}`).pipe(
      map( data => {
        return data.tiere
      })
    )
  }



}
