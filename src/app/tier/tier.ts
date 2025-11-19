import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tier',
  imports: [MatButtonModule],
  templateUrl: './tier.html',
  styleUrl: './tier.css',
})
export class Tier implements OnInit{

  route = inject(ActivatedRoute)
  router = inject(Router)
  activeOcean!:string;

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.activeOcean = params.get('ozean') || ''
      console.log('Este e o oceano ativo no Tiere Seite: ', this.activeOcean)
    })
    
  }

  onBack() {
    this.router.navigate([`/${this.activeOcean}`])
  }

}
