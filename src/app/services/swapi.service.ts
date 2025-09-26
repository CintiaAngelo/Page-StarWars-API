import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwapiFilm, SwapiPerson } from '../models';
import { Observable, forkJoin, map, of, shareReplay, catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SwapiService {
  private base = 'https://swapi.dev/api';
  private films$?: Observable<SwapiFilm[]>;

  constructor(private http: HttpClient) {}

  getFilms(): Observable<SwapiFilm[]> {
    if (!this.films$) {
      this.films$ = this.http.get<{ results: SwapiFilm[] }>(`${this.base}/films/`).pipe(
        map(r => r.results.sort((a, b) => a.episode_id - b.episode_id)),
        shareReplay(1)
      );
    }
    return this.films$;
  }

  getFilmByEpisode(episode: number): Observable<SwapiFilm | undefined> {
    return this.getFilms().pipe(map(f => f.find(x => x.episode_id === episode)));
  }

  getPerson(url: string): Observable<SwapiPerson | null> {
    // SWAPI sometimes enforces CORS; in dev it usually works.
    return this.http.get<SwapiPerson>(url).pipe(catchError(() => of(null)));
  }

  getPeople(urls: string[], limit = 6): Observable<(SwapiPerson | null)[]> {
    const slice = urls.slice(0, limit);
    if (slice.length === 0) return of([]);
    const calls = slice.map(u => this.getPerson(u));
    return forkJoin(calls);
  }
}
