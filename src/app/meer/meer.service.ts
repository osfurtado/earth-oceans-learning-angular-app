import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeerDto } from './meer.dto';
import { map, Observable } from 'rxjs';
import { TierDto } from '../tier/tier.dto';
import { environment } from '../../environments/environment.development';


export interface TierWithOcean extends TierDto{
  ozean: string;
}

@Injectable({
  providedIn: 'root',
})
export class MeerService {
  
  http = inject(HttpClient)




  public getMeerById(oceanId: number): Observable<MeerDto> {
    return this.http.get<MeerDto>(`${environment.api}/${oceanId}`)
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

  getAlleTiereVonOzean(oceanId: number):Observable<TierDto[]>{
    return this.http.get<MeerDto>(`${environment.api}/${oceanId}`).pipe(
      map( data => {
        return data.tiere
      })
    )
  }



}
