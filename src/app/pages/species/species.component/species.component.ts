import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../../services/swapi.service';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css',
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
export class SpeciesComponent implements OnInit {
  species: any[] = [];
  loading = true;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.swapiService.getSpecies().subscribe({
      next: (data: any[]) => {
        this.species = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao buscar espécies:', err);
        this.loading = false;
      }
    });
  }

  getSpeciesImage(name: string): string {
    const images: { [key: string]: string } = {
      'Human': 'https://starwars-visualguide.com/assets/img/species/1.jpg',
      'Droid': 'https://starwars-visualguide.com/assets/img/species/2.jpg',
      'Wookiee': 'https://starwars-visualguide.com/assets/img/species/3.jpg',
      'Rodian': 'https://starwars-visualguide.com/assets/img/species/4.jpg',
      'Hutt': 'https://starwars-visualguide.com/assets/img/species/5.jpg',
    };
    return images[name] || 'https://starwars-visualguide.com/assets/img/species/1.jpg'; // Imagem de fallback
  }
}