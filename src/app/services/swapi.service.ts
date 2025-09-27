// src/app/services/swapi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private readonly API_URL = 'https://swapi.dev/api/';

  constructor(private http: HttpClient) {}

  /**
   * Busca uma coleção de recursos da API SWAPI.
   * @param endpoint O nome do endpoint (ex: 'films', 'people', 'planets').
   * @returns Um Observable da coleção de recursos.
   */
  private getCollection(endpoint: string): Observable<any[]> {
    return this.http.get<any>(`${this.API_URL}${endpoint}/`).pipe(
      map(res => res.results)
    );
  }

  /**
   * Busca um recurso específico por ID.
   * @param endpoint O nome do endpoint.
   * @param id O ID do recurso.
   * @returns Um Observable do recurso.
   */
  private getItem(endpoint: string, id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}${endpoint}/${id}/`);
  }

  // Métodos Públicos para os endpoints
  getFilms(): Observable<any[]> {
    return this.getCollection('films').pipe(
      map(films => films.sort((a, b) => a.episode_id - b.episode_id))
    );
  }

  getFilm(id: string): Observable<any> {
    return this.getItem('films', id);
  }

  getCharacters(): Observable<any[]> {
    return this.getCollection('people');
  }

  getCharacter(id: string): Observable<any> {
    return this.getItem('people', id);
  }

  getPlanets(): Observable<any[]> {
    return this.getCollection('planets');
  }

  getPlanet(id: string): Observable<any> {
    return this.getItem('planets', id);
  }
  
  getSpecies(): Observable<any[]> {
    return this.getCollection('species');
  }

  getVehicles(): Observable<any[]> {
    return this.getCollection('vehicles');
  }
}