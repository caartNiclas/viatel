import { Dispatch, SetStateAction } from "react";
import { Search, Segment, Select } from "semantic-ui-react";
import IMovieData from "../../types/Movie";
import { Group } from "../../types/enums";
import { useState } from "react";
import MovieService from "../../services/MovieService";
import { Filter } from "../../types/Filter";

type FiltersProps = {
  setFilters: Dispatch<SetStateAction<Filter[]>>;
  amountVisible: number;
  amountTotal: number;
  genres: any;
  filters: Filter[];
  setMovies: Dispatch<SetStateAction<IMovieData[]>>;
};

export default function Filters({ setMovies, filters, setFilters, amountVisible, amountTotal, genres }: FiltersProps) {
  const [query, setQuery] = useState();

  const handleChange = (e: any, data: any) => {
    let filters = data.options.filter((genre: any) => data.value.includes(genre.value));
    const newFilter = filters.map((filter: any) => {
      return {
        name: filter.text,
        group: Group.GENRE,
        fnc: filter.fnc,
      };
    });
    setFilters(newFilter);
  };

  const search = (e: any, data: any) => {
    console.log(data);
    setQuery(data.value);
    if (data.value.length > 0) {
      MovieService.search(data.value)
        .then((response: any) => {
          setMovies(response.data.results);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    } else {
      setMovies([]);
    }
  };
  return (
    <Segment>
      <div className="container">
        <div className="row">
          <Select
            multiple
            placeholder="Select Genre"
            onChange={(e, data) => handleChange(e, data)}
            options={genres.map((genre: any) => {
              return {
                key: genre.id,
                text: genre.name,
                value: genre.id,
                fnc: (m: IMovieData) => m.genre_ids.indexOf(genre.id) !== -1,
              };
            })}
          ></Select>
          <Search placeholder="Search..." onSearchChange={(e, data) => search(e, data)} value={query} style={{ marginLeft: "auto" }} />
        </div>
      </div>
    </Segment>
  );
}
