import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../movie-service';

export const movieResolver: ResolveFn<any> = (route) => {
  const service = inject(MovieService);
  const id = route.paramMap.get('id')!;

  return service.getMovieDetails(Number(id)).value;
};
