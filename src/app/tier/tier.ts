import { Component, ElementRef, inject, Input, input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MeerDto } from '../meer/meer.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { MeerService } from '../meer/meer.service';
import { TierDto } from './tier.dto';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { environment } from '../../environments/environment.development';

interface TierDtoTemp {
  id: number;
  src: string;
  alt: string;
}

@Component({
  selector: 'app-tier',
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatIconModule, AsyncPipe],
  templateUrl: './tier.html',
  styleUrl: './tier.css',
})
export class Tier implements OnInit{

  route = inject(ActivatedRoute)
  router = inject(Router)
  meerService = inject(MeerService)

  activeOcean:string | null = null
  activeOzeanId!: number 

  selectedItemId: number | null = null
  selectedTier!: TierDto
  
  tiereObservable!: Observable<TierDto[]>
  
  tiere!: TierDto[]
  meere = environment.meereMenu

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;


  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe( params => {
      this.activeOcean = params.get('ozean')
      this.activeOzeanId = this.meere.filter(m => m.path === this.activeOcean)[0].id
      this.getTiere(this.activeOzeanId)
    })
  }

  onBack() {
    this.router.navigate([this.activeOcean])
  }

  onVergleich(){
    this.router.navigate([ this.activeOcean,'vergleich'], { queryParams: { source:'tier', oceanId: this.activeOzeanId,tierId: this.selectedTier.id } })
  }

  selectItem(id: number): void {
    this.selectedItemId = id;
    this.selectedTier = this.tiere.filter(t => t.id == this.selectedItemId)[0]
  }

  private async getTiere(id: number){
    this.tiereObservable = this.meerService.getAlleTiereVonMeer(id);
    this.tiere = await lastValueFrom(this.tiereObservable)
    this.selectItem(this.tiere[0].id)
  }

  scroll(direction: 'left' | 'right'){
    const container = this.scrollContainer.nativeElement
    const scrollAmount = 200

    if(direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }




}
