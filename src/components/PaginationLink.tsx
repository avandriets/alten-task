import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectMoviesTotal } from '../store';
import { removeFalsyValues } from '../utils';

export const PaginationLink: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const total = useSelector(selectMoviesTotal);
  const page = searchParams.get('page') ?? '1';

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const params = removeFalsyValues({
      ...Object.fromEntries([...searchParams]),
      page: `${value}`
    });

    setSearchParams(params);
  };

  if (total) {
    return (
      <Pagination count={Math.ceil(total / 10)}
                  page={+page}
                  shape="rounded"
                  onChange={handleChange}/>
    );
  } else {
    return <div></div>
  }

};
