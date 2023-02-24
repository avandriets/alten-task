import { MovieSearch } from '../interfaces';
import { TextField } from '@mui/material';
import { FunctionComponent } from 'react';

export const Search: FunctionComponent<MovieSearch> = (props) => {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // @ts-ignore
      const { target: { value } } = event;

      props.onSearch(value);
    }
  };

  return (
    <TextField label="Search movie"
               variant="outlined"
               size="small"
               onKeyDown={handleKeyDown}/>
  );
}
