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
    console.log('ID procurado:', id)
    return this.http.get<MeerDto[]>(this.url).pipe(
      map( data => {
        console.log('Dados recebidos do servidor:', data)
        console.log('IDs disponíveis:', data.map(m => m.id))
        const found = data.filter(m => m.id == id)[0]
        console.log('Item encontrado:', found)
        return found
      })
    )



  }


}
