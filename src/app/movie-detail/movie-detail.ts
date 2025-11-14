import { Component, effect, inject, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../movie-service';
import { ImagePipe } from '../pipes/image-pipe';

@Component({
  selector: 'app-movie-detail',
  imports: [ImagePipe],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  movie = this.#route.snapshot.data['movie'] as WritableSignal<Movie | undefined>;

  goBack() {
    this.#router.navigate(['/']);
  }
}
