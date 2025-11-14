import { Component, effect, inject } from '@angular/core';
import { MovieService } from '../movie-service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImagePipe } from '../pipes/image-pipe';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink, FormsModule, MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  private readonly service = inject(MovieService);
  searchMoviesLoading = this.service.searchMoviesLoading;
  movies = this.service.getPopularMovies();
  moviesByQuery = this.service.getSearchMovies();

  page = this.service.page;
  query = '';

  onSearch() {
    this.page.set(1);
    this.service.searchMoviesQuery(this.query);
  }

  prevPage() {
    if (this.page() > 1) this.service.setPage(this.page() - 1);
  }

  nextPage() {
    this.service.setPage(this.page() + 1);
  }

  prevPageSearch() {
    if (this.page() > 1) this.service.setPageSearch(this.page() - 1);
  }

  nextPageSearch() {
    this.service.setPageSearch(this.page() + 1);
  }
}
