import { IMovie } from '../types/movie';
import { IPagination } from '../types/pagination';

export class MovieService {
  private baseUrl = 'https://stapi.co/api/v1/rest';

  getMovies = (
    searchQuery: string,
    pageNumber: number
  ): Promise<{ movies: IMovie[]; page: IPagination }> => {
    const formBody = new URLSearchParams({
      title: searchQuery,
    }).toString();

    return fetch(
      `${this.baseUrl}/movie/search?pageSize=5&pageNumber=${pageNumber}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      }
    ).then((response) => response.json());
  };
}
