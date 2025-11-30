import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeerDto } from './meer.dto';
import { map, Observable } from 'rxjs';
import { TierDto } from '../tier/tier.dto';

@Injectable({
  providedIn: 'root',
})
export class MeerService {
  
  http = inject(HttpClient)
  url: string = 'http://localhost:3000/meere'



  public getMeerById(oceanId: number): Observable<MeerDto> {
    return this.http.get<MeerDto[]>(this.url).pipe(
      map( data => {
        return data.filter(m => m.id == oceanId)[0]
      })
    )
  }

  public getAllMeere(): Observable<MeerDto[]> {
    return this.http.get<MeerDto[]>(this.url)
  }


  getAllTiere():Observable<TierDto[]>{
    const tiere = []
    return this.http.get<MeerDto[]>(this.url).pipe(
      map( data => {
        return data.reduce((acc, item) => {
          return acc.concat(item.tiere)
        }, [] as TierDto[])
      })
    )
  }

}
