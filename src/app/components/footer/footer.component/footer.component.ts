import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  navItems = [
    { label: 'Filmes', path: '/movies' },
    { label: 'Personagens', path: '/characters' },
    { label: 'Planetas', path: '/planets' },
    { label: 'Espécies', path: '/species' },
    { label: 'Veículos', path: '/vehicles' },
  ];
  
  techItems = [
    'Angular', 'TypeScript', 'CSS', 'Lucide Icons', 'SWAPI'
  ];
}