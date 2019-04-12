var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var allMovies = require('./routes/allMovies');
var getMovieById = require('./routes/getMovieById');
var getRandomMovie = require('./routes/getRandomMovie');
var getMoviesByGenre = require('./routes/getMoviesByGenre');
var getGenresByMovie = require('./routes/getMovieGenres');
var getGenreId = require('./routes/getGenre');

var app = express();

//database
const db = require('./config/database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/all_movies', allMovies);
app.use('/movie', getMovieById);
app.use('/random_movie', getRandomMovie);
app.use('/by_genre', getMoviesByGenre);
app.use('/moviegenre', getGenresByMovie);
app.use('/genreid', getGenreId);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
