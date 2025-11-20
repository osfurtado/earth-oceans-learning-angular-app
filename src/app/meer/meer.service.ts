import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeerDto } from './meer.dto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeerService {
  
  http = inject(HttpClient)
  url: string = 'http://localhost:3000/meere'



  public getMeerById(id: number = 1): Observable<MeerDto> {
    return this.http.get<MeerDto[]>(this.url).pipe(
      map( data => {
        const found = data.filter(m => m.id == id)[0]
        return found
      })
    )



  }


}
