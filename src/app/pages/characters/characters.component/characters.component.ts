import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SwapiService } from '../../../services/swapi.service';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
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
export class CharactersComponent implements OnInit {
  characters: any[] = [];
  loading = true;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.swapiService.getCharacters().subscribe({
      next: (data) => {
        this.characters = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar personagens:', err);
        this.loading = false;
      }
    });
  }

  getCharacterId(url: string): string {
    const matches = url.match(/\/people\/(\d+)\//);
    return matches ? matches[1] : '1';
  }

  getCharacterImage(name: string): string {
    const images: { [key: string]: string } = {
      'Luke Skywalker': 'https://starwars-visualguide.com/assets/img/characters/1.jpg',
      'C-3PO': 'https://starwars-visualguide.com/assets/img/characters/2.jpg',
      'R2-D2': 'https://starwars-visualguide.com/assets/img/characters/3.jpg',
      'Darth Vader': 'https://starwars-visualguide.com/assets/img/characters/4.jpg',
      'Leia Organa': 'https://starwars-visualguide.com/assets/img/characters/5.jpg',
    };
    return images[name] || 'https://starwars-visualguide.com/assets/img/characters/1.jpg'; // Imagem de fallback
  }
}