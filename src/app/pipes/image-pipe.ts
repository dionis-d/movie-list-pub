import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  pure: true,
})
export class ImagePipe implements PipeTransform {
  private baseUrl = 'https://image.tmdb.org/t/p/w500';

  transform(path: string | null): string {
    if (!path) return 'assets/no-image.png';
    return `${this.baseUrl}${path}`;
  }
}
