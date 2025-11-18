import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meer-details',
  imports: [],
  templateUrl: './meer-details.html',
  styleUrl: './meer-details.css',
})
export class MeerDetails {

  route = inject(ActivatedRoute)
  @Input({required: true}) meer: string | null = null








}
