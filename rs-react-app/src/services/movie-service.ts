import { IMovie } from '../types/movie';
import { IPagination } from '../types/pagination';

export class MovieService {
  private baseUrl = 'https://stapi.co/api/v1/rest/movie';

  getMovies = (
    searchQuery: string,
    pageNumber: number
  ): Promise<{ movies: IMovie[]; page: IPagination }> => {
    const formBody = new URLSearchParams({
      title: searchQuery,
    }).toString();

    return fetch(`${this.baseUrl}/search?pageSize=5&pageNumber=${pageNumber}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    }).then((response) => response.json());
  };

  getMovie = (id: string): Promise<{ movie: IMovie }> => {
    return fetch(`${this.baseUrl}?uid=${id}`).then((response) =>
      response.json()
    );
  };
}
