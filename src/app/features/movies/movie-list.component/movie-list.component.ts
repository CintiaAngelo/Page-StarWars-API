// src/app/features/movies/movie-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../../services/swapi.service';
import { MovieCardComponent } from '../../movies/movie-card.component/movie-card.component';
import { SpinnerComponent } from '../../../shared/spinner.component/spinner.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCardComponent, SpinnerComponent],
  template: `
    <section class="hero" style="min-height:520px;">
      <div class="overlay"></div>
      <div class="hero-inner container px-4">
        <h1 class="star-wars-font">MAY THE STREAM BE WITH YOU</h1>
        <p>Explore the complete Star Wars saga in one place. From the classic trilogy to the latest adventures.</p>
        <div style="display:flex; justify-content:center; gap:12px; margin-top:18px;">
          <button class="btn btn-accent"><i data-feather="play"></i> Start Watching</button>
          <button class="btn btn-outline"><i data-feather="info"></i> Learn More</button>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:48px;">
      <div class="container px-4">
        <h2 class="title star-wars-font text-center">THE COMPLETE SAGA</h2>

        <div class="filter-row">
          <button (click)="setFilter('')" [class.active]="filter===''" >All</button>
          <button (click)="setFilter('pre')" [class.active]="filter==='pre'">Prequels</button>
          <button (click)="setFilter('orig')" [class.active]="filter==='orig'">Originals</button>
          <button (click)="setFilter('seq')" [class.active]="filter==='seq'">Sequels</button>
          <button (click)="setFilter('stand')" [class.active]="filter==='stand'">Standalone</button>
        </div>

        <ng-container *ngIf="!films; else grid">
          <app-spinner></app-spinner>
        </ng-container>

        <ng-template #grid>
          <div class="grid cols-4">
            <ng-container *ngFor="let f of filtered()">
              <app-movie-card [film]="f"></app-movie-card>
            </ng-container>
          </div>
        </ng-template>
      </div>
    </section>

    <!-- featured character -->
    <section class="featured">
      <div class="container px-4">
        <h2 class="title star-wars-font text-center">FEATURED CHARACTER</h2>
        <div class="card">
          <div style="flex:1;">
            <img src="https://static.photos/technology/640x360/5" alt="Darth Vader" class="rounded" />
          </div>
          <div style="flex:2;">
            <h3 class="star-wars-font text-yellow">Darth Vader</h3>
            <p style="color:#d1d5db">Once a heroic Jedi Knight ...</p>
            <div class="info-grid" style="margin:16px 0;">
              <div><p class="text-muted">Species</p><p>Human</p></div>
              <div><p class="text-muted">Homeworld</p><p>Tatooine</p></div>
              <div><p class="text-muted">Gender</p><p>Male</p></div>
              <div><p class="text-muted">Height</p><p>2.03m</p></div>
            </div>
            <button class="btn btn-outline">View Full Profile</button>
          </div>
        </div>
      </div>
    </section>

    <!-- scroll opener + crawl placeholder -->
    <section style="padding:48px 0;">
      <div class="scroll-opener">
        <div class="pulse" style="text-align:center;">
          <i data-feather="chevrons-down" style="font-size:28px;"></i>
          <p>Scroll Down for Classic Intro</p>
        </div>
      </div>
    </section>
  `
})
export class MovieListComponent {
  films: any[] | null = null;
  filter: string = '';

  constructor(private sw: SwapiService){
    this.sw.getFilms().subscribe(f => this.films = f);
  }

  setFilter(f: string) { this.filter = f; }

  filtered(){
    if (!this.films) return [];
    // For demo: apply very simple grouping by episode_id
    if (!this.filter) return this.films;
    if (this.filter === 'orig') return this.films.filter(x => [4,5,6].includes(x.episode_id));
    if (this.filter === 'pre') return this.films.filter(x => [1,2,3].includes(x.episode_id));
    if (this.filter === 'seq') return this.films.filter(x => [7,8,9].includes(x.episode_id));
    return this.films;
  }
}
