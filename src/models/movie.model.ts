import { AbstractModel } from "./abstract.model";
import { Movie } from "../interfaces";

export class MovieModel extends AbstractModel<Movie> {

  constructor(data: Movie) {
    super(data);
  }

  getImdbID(): string {
    return this.data.imdbID;
  }

  getTitle(): string {
    return this.data.Title;
  }

  getReleased(): string {
    return this.data.Released;
  }

  getYear(): string {
    return this.data.Year;
  }

  getPoster(): string {
    return this.data.Poster;
  }

}
