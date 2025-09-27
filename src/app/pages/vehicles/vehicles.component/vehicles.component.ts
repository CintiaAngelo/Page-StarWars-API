import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../../services/swapi.service';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
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
export class VehiclesComponent implements OnInit {
  vehicles: any[] = [];
  loading = true;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.swapiService.getVehicles().subscribe({
      next: (data: any[]) => {
        this.vehicles = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao buscar veículos:', err);
        this.loading = false;
      }
    });
  }

  getVehicleId(url: string): string {
    const matches = url.match(/\/vehicles\/(\d+)\//);
    return matches ? matches[1] : '1';
  }

  getVehicleImage(name: string): string {
    const images: { [key: string]: string } = {
      'Sand Crawler': 'https://starwars-visualguide.com/assets/img/vehicles/4.jpg',
      'T-65 X-wing': 'https://starwars-visualguide.com/assets/img/vehicles/6.jpg',
      'Star Destroyer': 'https://starwars-visualguide.com/assets/img/vehicles/10.jpg',
      'Millennium Falcon': 'https://starwars-visualguide.com/assets/img/vehicles/13.jpg',
      'AT-AT': 'https://starwars-visualguide.com/assets/img/vehicles/19.jpg',
    };
    return images[name] || 'https://starwars-visualguide.com/assets/img/vehicles/4.jpg'; // Imagem de fallback
  }
}