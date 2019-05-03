const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const cors = require('cors');
const passport = require('passport');

const indexRouter = require('./routes/index');
const { routerAllMovies, routerSingleMovie, randomMovie, MovieGenre, byGenre } = require('./routes/movieRouters');
// const getMoviesByGenre = require('./routes/getMoviesByGenre');
// const getGenresByMovie = require('./routes/getMovieGenres');
const getGenreId = require('./routes/getGenre');
const allGenres = require('./routes/allGenres');
const searchTitle = require('./routes/searchTitle');

const registerUser = require('./routes/registerUser');
const loginUser = require('./routes/loginUser');
const findUser = require('./routes/findUser');
const updateUser = require('./routes/updateInfo');

const watchLater = require('./routes/watchLater');
const getwatchlater = require('./routes/getArchivedMovies');
const checkEligibliness = require('./routes/checkEligiblinessOfMovie');

app.use(cors());
require('./config/passport');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/all_movies', routerAllMovies);
app.use('/movie', routerSingleMovie);
app.use('/random_movie', randomMovie);
app.use('/by_genre', byGenre);
app.use('/moviegenre', MovieGenre);
app.use('/genreid', getGenreId);
app.use('/register', registerUser);
app.use('/login', loginUser);
app.use('/finduser', findUser);
app.use('/allgenres', allGenres);
app.use('/searchTitle', searchTitle);
app.use('/watchlater', watchLater);
app.use('/getwatchlater', getwatchlater);
app.use('/updateUser', updateUser);
app.use('/checkMovie', checkEligibliness);
// app.use('/routes/registerUser', )

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

module.exports = app;
