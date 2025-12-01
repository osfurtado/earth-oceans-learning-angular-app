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
  activeOcean:string | null = null
  selectedItemId: number | null = null
  selectedTier!: TierDto
  activeOzeanId!: number 
  meerObservable!: Observable<MeerDto>
  meerService = inject(MeerService)
  selectedMeer!: MeerDto
  tiere!: TierDto[]

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe( params => {
      this.activeOcean = params.get('ozean')
      this.activeOzeanId = this.meere.filter(m => m.path === this.activeOcean)[0].id
      this.getMeer(this.activeOzeanId)
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

  private async getMeer(id: number){
    this.meerObservable = this.meerService.getMeerById(id);
    this.selectedMeer = await lastValueFrom(this.meerObservable)
    this.tiere = this.selectedMeer.tiere
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

  items: TierDtoTemp[] = [
    { id: 1, src: 'https://via.placeholder.com/250', alt: 'Tier 1' },
    { id: 2, src: 'https://via.placeholder.com/250', alt: 'Tier 2' },
    { id: 3, src: 'https://via.placeholder.com/250', alt: 'Tier 3' },
    { id: 4, src: 'https://via.placeholder.com/250', alt: 'Tier 4' },
    { id: 5, src: 'https://via.placeholder.com/250', alt: 'Tier 5' },
    { id: 6, src: 'https://via.placeholder.com/250', alt: 'Tier 6' },
    { id: 7, src: 'https://via.placeholder.com/250', alt: 'Tier 7' },
    { id: 8, src: 'https://via.placeholder.com/250', alt: 'Tier 8' },
  ];

  meere = [
    {
      id: 2,
      path: 'atlantik'
    },
    {
      id: 3,
      path: 'indik',
    },
    {
      id: 1,
      path: 'pazifik'
    },
    {
      id: 5,
      path: 'artik'
    },
    {
      id: 4,
      path: 'antarktik'
    }
  ]


}
