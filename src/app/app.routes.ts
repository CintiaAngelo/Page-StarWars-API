import { Routes } from '@angular/router';
import { MoviesComponent } from './pages/movies/movies.component/movies.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail';
import { CharactersComponent } from './pages/characters/characters.component/characters.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component/character-detail.component';
import { HomeComponent } from './pages/home/home.component/home.component';
import { PlanetsComponent } from './pages/planets/planets.component/planets.component';
import { PlanetDetailComponent } from './pages/planet-detail/planet-detail.component/planet-detail.component';
import { SpeciesComponent } from './pages/species/species.component/species.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component/vehicles.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: 'planets/:id', component: PlanetDetailComponent },
  { path: 'species', component: SpeciesComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: '**', redirectTo: '' }
];