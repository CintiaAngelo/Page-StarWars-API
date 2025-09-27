import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SwapiService } from '../../../services/swapi.service';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger('100ms', animate('0.6s ease-out', style({ opacity: 1, transform: 'none' })))
        ], { optional: true })
      ])
    ])
  ]
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  loading = true;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.swapiService.getFilms().subscribe({
      next: (data) => {
        this.movies = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar filmes:', err);
        this.loading = false;
      }
    });
  }

  getMovieId(url: string): string {
    const matches = url.match(/\/films\/(\d+)\//);
    return matches ? matches[1] : '1';
  }

  getMoviePoster(episodeId: number): string {
    return `https://starwars-visualguide.com/assets/img/films/${episodeId}.jpg`;
  }
}