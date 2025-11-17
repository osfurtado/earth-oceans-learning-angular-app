import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meer',
  imports: [],
  templateUrl: './meer.html',
  styleUrl: './meer.css',
})
export class Meer implements OnInit {

  route = inject(ActivatedRoute)
  activeOzean: string | null = null

  ngOnInit(): void {
    this.activeOzean = this.route.snapshot.paramMap.get('ozean');
  }

}
