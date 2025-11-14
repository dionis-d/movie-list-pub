import { Component, input } from '@angular/core';
import { ImagePipe } from '../pipes/image-pipe';
import { Movie } from '../movie-service';

@Component({
  selector: 'app-movie-card',
  imports: [ImagePipe],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  movie = input.required<Movie>();
}
