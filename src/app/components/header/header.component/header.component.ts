import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('menuAnimation', [
      state('closed', style({ height: '0', opacity: 0 })),
      state('open', style({ height: 'auto', opacity: 1 })),
      transition('closed <=> open', animate('300ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent {
  isMenuOpen = false;
  navItems = [
    { path: '/', label: 'Início' },
    { path: '/movies', label: 'Filmes' },
    { path: '/characters', label: 'Personagens' },
    { path: '/planets', label: 'Planetas' },
    { path: '/species', label: 'Espécies' },
    { path: '/vehicles', label: 'Veículos' },
  ];
}