import { IMovie } from '../types/movie';

export class MovieService {
  private baseUrl = 'https://stapi.co/api/v1/rest';

  getMovies = (search: string): Promise<IMovie[]> => {
    const formBody = new URLSearchParams({ title: search }).toString();

    return fetch(`${this.baseUrl}/movie/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then(({ movies }) => movies);
  };
}
