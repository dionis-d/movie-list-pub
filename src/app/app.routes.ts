import { Routes } from '@angular/router';
import { movieResolver } from './resolvers/movie-resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./movie-list/movie-list').then(c => c.MovieList)
  },
  {
    path: ':id',
    resolve: { movie: movieResolver },
    loadComponent: () =>
      import('./movie-detail/movie-detail').then(c => c.MovieDetail)
  }
];
