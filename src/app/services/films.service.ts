import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilmsService {
  private swapiUrl = 'https://swapi.dev/api/films/';
  private akababUrl = 'https://akabab.github.io/starwars-api/api/all.json';

  constructor(private http: HttpClient) {}

  getFilms(): Observable<any[]> {
    return this.http.get<any>(this.swapiUrl).pipe(
      map(res => res.results.sort((a: any, b: any) => a.episode_id - b.episode_id))
    );
  }

  getFilmPoster(episode: number): Observable<string> {
  return this.http.get<any[]>(this.akababUrl).pipe(
    map(films => {
      // O Akabab usa "episode" e "title" para os filmes
      const f = films.find(f => f.episode === episode);
      return f?.image || 'https://starwars-visualguide.com/assets/img/films/default.jpg';
    })
  );
}

}
