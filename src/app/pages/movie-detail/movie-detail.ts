import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SwapiService } from '../../services/swapi.service';
import { LucideAngularModule } from 'lucide-angular';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]
})
export class MovieDetailComponent implements OnInit {
  movie: any | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        if (id) {
          return this.swapiService.getFilm(id);
        }
        return of(null);
      })
    ).subscribe({
      next: (data) => {
        this.movie = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar filme:', err);
        this.loading = false;
      }
    });
  }

  getMoviePoster(episodeId: number): string {
    return `https://starwars-visualguide.com/assets/img/films/${episodeId}.jpg`;
  }
}