import { Box, Link } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById, selectMoviesEntity, selectMoviesState } from '../store';
import { useEffect } from 'react';
import { Status } from '../interfaces';

export const MovieDetails: React.FC = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const movie = useSelector(selectMoviesEntity(id));
  const moviesStatus: Status = useSelector(selectMoviesState);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [id]);

  let content = (<div>movie: {movie?.getTitle()}</div>);

  if (moviesStatus.err) {
    content = (<div>{moviesStatus.err}</div>);
  } else if (moviesStatus.pending) {
    content = (<div>pending</div>);
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'start', mb: 4 }}>
        <Link href={'/'}>Back to list</Link>
      </Box>
      {content}
    </Box>
  );

};
