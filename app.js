import createError from 'http-errors';
import express, { json, urlencoded, static } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const app = express();
import cors from 'cors';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import allMovies from './routes/allMovies';
import getMovieById from './routes/getMovieById';
import getRandomMovie from './routes/getRandomMovie';
import getMoviesByGenre from './routes/getMoviesByGenre';
import getGenresByMovie from './routes/getMovieGenres';
import getGenreId from './routes/getGenre';

app.use(cors());


// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(static(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/all_movies', allMovies);
app.use('/movie', getMovieById);
app.use('/random_movie', getRandomMovie);
app.use('/by_genre', getMoviesByGenre);
app.use('/moviegenre', getGenresByMovie);
app.use('/genreid', getGenreId);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
