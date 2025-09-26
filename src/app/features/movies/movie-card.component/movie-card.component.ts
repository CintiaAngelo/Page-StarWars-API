import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiFilm } from '../../../models';
import { RouterModule } from '@angular/router';

declare global {
  interface Window {
    feather?: {
      replace: () => void;
    };
  }
}

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent implements AfterViewInit {
  @Input() film!: SwapiFilm;
  
  // Mock data for static display
  poster = 'https://static.photos/technology/640x360/1';
  rating = (4 + Math.random()).toFixed(1);

  ngAfterViewInit(): void {
    if (window.feather) {
      window.feather.replace();
    }
  }
}