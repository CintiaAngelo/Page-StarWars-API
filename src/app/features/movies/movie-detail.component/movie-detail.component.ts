import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SwapiService } from '../../../services/swapi.service';
import { SwapiFilm, SwapiPerson } from '../../../models';
import { SpinnerComponent } from '../../../shared/spinner.component/spinner.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SpinnerComponent, LucideAngularModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {
  film: SwapiFilm | null = null;
  characters: (SwapiPerson | null)[] = [];

  constructor(private route: ActivatedRoute, private sw: SwapiService) {
    const ep = Number(this.route.snapshot.paramMap.get('episode'));
    this.sw.getFilmByEpisode(ep).subscribe(f => {
      this.film = f ?? null;
      if (f) {
        this.loadCharacters(f.characters);
      }
    });
  }

  loadCharacters(urls: string[]) {
    this.sw.getPeople(urls, 8).subscribe(arr => this.characters = arr.filter(Boolean));
  }
}
