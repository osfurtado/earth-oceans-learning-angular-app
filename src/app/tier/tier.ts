import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

interface TierDto {
  id: number;
  src: string;
  alt: string;
}

@Component({
  selector: 'app-tier',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './tier.html',
  styleUrl: './tier.css',
})
export class Tier implements OnInit{

  route = inject(ActivatedRoute)
  router = inject(Router)
  activeOcean!:string;
  selectedItemId: number | null = null
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.activeOcean = params.get('ozean') || ''
      console.log('Este e o oceano ativo no Tiere Seite: ', this.activeOcean)
    })
    
  }

  onBack() {
    this.router.navigate([`/${this.activeOcean}`])
  }

  selectItem(id: number): void {
    this.selectedItemId = id;
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

  items: TierDto[] = [
    { id: 1, src: 'https://via.placeholder.com/250', alt: 'Tier 1' },
    { id: 2, src: 'https://via.placeholder.com/250', alt: 'Tier 2' },
    { id: 3, src: 'https://via.placeholder.com/250', alt: 'Tier 3' },
    { id: 4, src: 'https://via.placeholder.com/250', alt: 'Tier 4' },
    { id: 5, src: 'https://via.placeholder.com/250', alt: 'Tier 5' },
    { id: 6, src: 'https://via.placeholder.com/250', alt: 'Tier 6' },
    { id: 7, src: 'https://via.placeholder.com/250', alt: 'Tier 7' },
    { id: 8, src: 'https://via.placeholder.com/250', alt: 'Tier 8' },
  ];


}
