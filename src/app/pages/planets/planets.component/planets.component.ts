import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SwapiService } from '../../../services/swapi.service';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.css',
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
export class PlanetsComponent implements OnInit {
  planets: any[] = [];
  loading = true;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.swapiService.getPlanets().subscribe({
      next: (data) => {
        this.planets = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar planetas:', err);
        this.loading = false;
      }
    });
  }

  getPlanetId(url: string): string {
    const matches = url.match(/\/planets\/(\d+)\//);
    return matches ? matches[1] : '1';
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
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return population;
  }
}