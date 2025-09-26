import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  {
    path: 'movies',
    loadComponent: () => import('./features/movies/movie-list.component/movie-list.component').then(
      (m) => m.MovieListComponent
    ),
  },
  {
    path: 'movies/:episode',
    loadComponent: () => import('./features/movies/movie-detail.component/movie-detail.component').then(
      (m) => m.MovieDetailComponent
    ),
  },
  { path: '**', redirectTo: 'movies' },
];
