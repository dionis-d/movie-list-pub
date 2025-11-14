import { Injectable, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { environment } from '../environments/environment';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  #apiUrl = 'https://api.themoviedb.org/3';
  #apiKey = environment.apiKey;

  public page = signal(1);
  public searchQuery = signal('');
  public searchQueryDebounced = toSignal(toObservable(this.searchQuery).pipe(debounceTime(300)));

  public popularMovies = httpResource<TMDBResponse>(
    () =>
      `${this.#apiUrl}/movie/popular?api_key=${this.#apiKey}&page=${this.page().toString()}&language=en-US`,
  );

  public popularMoviesError = this.popularMovies.error;
  public popularMoviesLoading = this.popularMovies.isLoading;

  public searchMovies = httpResource<TMDBResponse>(
    () =>
      `${this.#apiUrl}/search/movie?api_key=${this.#apiKey}&page=${this.page().toString()}&query=${this.searchQueryDebounced()}&language=en-US`,
  );

  public searchMoviesError = this.searchMovies.error;
  public searchMoviesLoading = this.searchMovies.isLoading;

  public getPopularMovies() {
    return this.popularMovies;
  }

  public getSearchMovies() {
    return this.searchMovies;
  }

  public searchMoviesQuery(keyword: string) {
    this.page.set(1);
    this.searchQuery.set(keyword);
  }

  public getMovieDetails(id: number) {
    return httpResource<TMDBResponse>(
      () => `${this.#apiUrl}/movie/${id}?api_key=${this.#apiKey}&language=en-US`,
    );
  }

  public setPage(p: number) {
    this.page.set(p);
    this.popularMovies.reload();
  }

  public setPageSearch(p: number) {
    this.page.set(p);
    this.searchMovies.reload();
  }
}
