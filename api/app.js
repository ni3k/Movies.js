const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const cors = require('cors');
const passport = require('passport');
const MovieController = require('./controllers/MovieController');
const GenreController = require('./controllers/GenreController');
const UserController = require('./controllers/UserController');
const UserInteractionsController = require('./controllers/UserInteractionsController');

// for api information
const indexRouter = express.Router();
indexRouter.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

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
const movieController = new MovieController('', app);
const genreController = new GenreController('', app);
const userController = new UserController('', app);
const userInteractionsController = new UserInteractionsController('', app);


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
