import { TextField } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { removeFalsyValues } from '../utils';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // @ts-ignore
      const { target: { value } } = event;
      const currentParams = Object.fromEntries([...searchParams]);
      const params = removeFalsyValues({ ...currentParams, search: value });

      setSearchParams(params);
    }
  };

  return (
    <TextField label="Search movie"
               variant="outlined"
               size="small"
               defaultValue={searchParams.get('search') ?? ''}
               onKeyDown={handleKeyDown}/>
  );
};
