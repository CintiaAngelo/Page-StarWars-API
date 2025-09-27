import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SwapiService } from '../../../services/swapi.service';
import { LucideAngularModule } from 'lucide-angular';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]
})
export class CharacterDetailComponent implements OnInit {
  character: any | null = null;
  loading = true;
  
  constructor(private route: ActivatedRoute, private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        if (id) {
          return this.swapiService.getCharacter(id);
        }
        return of(null);
      })
    ).subscribe({
      next: (data) => {
        this.character = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar personagem:', err);
        this.loading = false;
      }
    });
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