import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeerDto } from './meer.dto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeerService implements OnInit{
  
  http = inject(HttpClient)
  url: string = '/data/ozeans.json'


  ngOnInit(): void {
    
  }

  public getMeerById(id: number = 1): Observable<MeerDto> {

    return this.http.get<MeerDto[]>(this.url).pipe(
      map( data => {
        return data.filter(m => m.id === id)[0]
      })
    )
  }


}
