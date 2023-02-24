import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectMoviesTotal } from '../store';
import { removeFalsyValues } from '../utils';

export const PaginationLink: React.FC = () => {
  const total = useSelector(selectMoviesTotal);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);

  const page = currentParams.page ?? '1';
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const currentParams = Object.fromEntries([...searchParams]);
    const params = removeFalsyValues({ ...currentParams, page: `${value}` });

    setSearchParams(params);
  };

  return (
    <Pagination count={Math.ceil(total / 10)}
                page={+page}
                shape="rounded"
                onChange={handleChange}/>
  );
};
