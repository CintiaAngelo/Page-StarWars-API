import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    // Trigger para animação do Hero
    trigger('heroAnimation', [
      transition(':enter', [
        query(
          '.hero-title, .hero-subtitle, .hero-buttons',
          [
            style({ opacity: 0, transform: 'translateY(50px)' }),
            stagger(
              '300ms',
              animate('1s ease-out', style({ opacity: 1, transform: 'none' }))
            )
          ],
          { optional: true }
        )
      ])
    ]),

    // Trigger para animação das categorias
    trigger('categoriesAnimation', [
      transition(':enter', [
        query(
          '.category-card',
          [
            style({ opacity: 0, transform: 'translateY(50px)' }),
            stagger(
              '100ms',
              animate('0.6s ease-out', style({ opacity: 1, transform: 'none' }))
            )
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class HomeComponent {
  categories = [
    {
      icon: 'film',
      title: 'Filmes',
      description: 'Toda a saga em ordem cronológica',
      path: '/movies',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: 'users',
      title: 'Personagens',
      description: 'Heróis e vilões icônicos',
      path: '/characters',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: 'globe',
      title: 'Planetas',
      description: 'Mundos distantes da galáxia',
      path: '/planets',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: 'dna',
      title: 'Espécies',
      description: 'Formas de vida únicas',
      path: '/species',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: 'car',
      title: 'Veículos',
      description: 'Naves e transportes épicos',
      path: '/vehicles',
      color: 'from-orange-500 to-red-600'
    }
  ];
}
