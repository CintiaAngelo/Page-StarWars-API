import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SwapiService } from '../../../services/swapi.service';
import { LucideAngularModule } from 'lucide-angular';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './planet-detail.component.html',
  styleUrl: './planet-detail.component.css',
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]
})
export class PlanetDetailComponent implements OnInit {
  planet: any | null = null;
  loading = true;
parseInt: any;

  constructor(private route: ActivatedRoute, private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        if (id) {
          return this.swapiService.getPlanet(id);
        }
        return of(null);
      })
    ).subscribe({
      next: (data) => {
        this.planet = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar planeta:', err);
        this.loading = false;
      }
    });
  }

  getPlanetImage(name: string): string {
    const images: { [key: string]: string } = {
      'Tatooine': 'https://starwars-visualguide.com/assets/img/planets/1.jpg',
      'Alderaan': 'https://starwars-visualguide.com/assets/img/planets/2.jpg',
      'Yavin IV': 'https://starwars-visualguide.com/assets/img/planets/3.jpg',
      'Hoth': 'https://starwars-visualguide.com/assets/img/planets/4.jpg',
      'Dagobah': 'https://starwars-visualguide.com/assets/img/planets/5.jpg',
    };
    return images[name] || 'https://starwars-visualguide.com/assets/img/planets/1.jpg';
  }

  formatPopulation(population: string): string {
    if (population === 'unknown') return 'Desconhecida';
    const num = parseInt(population);
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)} bilhões`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)} milhões`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)} mil`;
    return population;
  }
}