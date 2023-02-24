import { FunctionComponent } from "react";
import { TextField } from "@mui/material";
import { MovieSearch } from "../interfaces";

export const Search: FunctionComponent<MovieSearch> = (props) => {

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;

    props.onSearch(value);
  };

  return (
    <TextField label="Search movie"
               variant="outlined"
               size="small"
               onChange={handleSearch}/>
  );
}
