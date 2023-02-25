import {
  AsyncThunk,
  EntityAdapter,
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { Movie, Status } from '../interfaces';
import { moviesService } from './movie.service';
import { MovieModel } from '../models';

export const MOVIE_FEATURE_KEY = 'movies';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

export interface MovieState extends EntityState<Movie> {
  status: Status;
  total: number;
}

const moviesAdapter: EntityAdapter<Movie> = createEntityAdapter<Movie>({
    selectId: (entity: Movie) => entity.imdbID,
  }
);

export const fetchMovies = createAsyncThunk(
  `${MOVIE_FEATURE_KEY}/fetchMovies`,
  async (params: { [key: string]: string }, { rejectWithValue }) => {
    try {
      const response: { count: number, rows: Movie[] } =
        await moviesService.get( params);

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  `${MOVIE_FEATURE_KEY}/fetchMovieById`,
  async (id: string, { rejectWithValue }) => {
    try {
      const response: Movie =
        await moviesService.getById(id, {});

      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const clearMovies = createAsyncThunk(
  `${MOVIE_FEATURE_KEY}/clearMovies`,
  async () => {
    return { count: 0, rows: [] };
  }
);

const initialState: MovieState = moviesAdapter.getInitialState({
  status: {
    resolved: false,
    rejected: false,
    pending: false,
    err: null,
  },
  total: 0,
});

const movieSlice = createSlice({
  name: MOVIE_FEATURE_KEY,
  initialState,
  reducers: {
    add: moviesAdapter.addOne,
    remove: moviesAdapter.removeOne,
    setResolved(state) {
      state.status = {
        resolved: true,
        rejected: false,
        pending: false,
        err: null,
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchMovies.fulfilled,
        (state: MovieState, action: PayloadAction<{ count: number, rows: Movie[] }>) => {
          moviesAdapter.setAll(state, action.payload.rows);
          state.status = {
            resolved: true,
            rejected: false,
            pending: false,
            err: null,
          };
          state.total = action.payload.count;
        }
      )
      .addCase(
        fetchMovieById.fulfilled,
        (state: MovieState, action: PayloadAction<Movie>) => {
          moviesAdapter.upsertOne(state, action.payload);
          state.status = {
            resolved: true,
            rejected: false,
            pending: false,
            err: null,
          };
        }
      )
      .addCase(
        clearMovies.fulfilled,
        (state) => {
          moviesAdapter.removeAll(state);
          state.total = 0;
          state.status = {
            ...state.status,
            resolved: true,
            rejected: false,
            pending: false,
            err: null,
          };
        })

      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = {
            ...state.status,
            pending: true,
          };
        })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action: any) => {
          state.status = {
            resolved: false,
            rejected: true,
            pending: false,
            err: (action.payload ? action.payload?.message : action.error.message) || 'Request was rejected.',
          };
        });
  },
});

// Reducer
export const moviesReducer = movieSlice.reducer;

// Actions
export const moviesActions = movieSlice.actions;

const { selectAll, selectEntities, selectById, selectIds } = moviesAdapter.getSelectors();

// Selectors
export const getMoviesState = (rootState: any): MovieState => rootState[MOVIE_FEATURE_KEY];

export const selectAllMovies = createSelector(getMoviesState, selectAll);

export const selectMoviesEntities = createSelector(getMoviesState, selectEntities);

export const selectMoviesIds = createSelector(getMoviesState, selectIds);

export const selectMoviesEntity =
  (movieId: any) => createSelector(getMoviesState, (state) => {
    const entity = selectById(state, movieId);

    return entity ? new MovieModel(entity) : null;
  });

export const selectMoviesTotal = createSelector(
  getMoviesState,
  data => data.total,
);

export const selectMoviesState = createSelector(
  getMoviesState,
  data => data.status,
);
