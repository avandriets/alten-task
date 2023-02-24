import { Button, Card, CardActions, CardContent, Typography, CardMedia } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { MovieCardInterface } from '../interfaces';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export const MovieCard: FunctionComponent<MovieCardInterface> = (props: MovieCardInterface) => {
  const classes = useStyles();

  return (
    <Card sx={{ minWidth: 200 }} variant="outlined">
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"/>

      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Title
        </Typography>
        <Typography variant="h6" component="div">
          {props.movie.getTitle()}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Released
        </Typography>
        <Typography variant="h6" component="div">
          {props.movie.getReleased()}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Year
        </Typography>
        <Typography sx={{ fontSize: 13 }} component="div">
          {props.movie.getYear()}
        </Typography>

      </CardContent>
    </Card>
  );
}
