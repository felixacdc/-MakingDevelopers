import express from 'express';
import path from 'path';
//import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import stylus from 'stylus';

import routes from './routes/index';
import users from './routes/users';
import hbsHelpers from './lib/helpers/handlebars';
import config from './lib/config';

const app = express();

// Loading config
global.$config = config;

// Stylus middleware
if (!$config().html.css.stylusPrecompile) {
  app.use(
    stylus.middleware({
      src: `${__dirname}/stylus`,
      dest: `${__dirname}/public/css`,
      compile: function(str, path) {
        return stylus(str).set('filename', path).set('compress', true);
      }
    })
  );
}

// Sending config to templates
app.use((req, res, next) => {
  res.locals.config = config();
  next();
});

// Handlebars setup
app.engine($config().views.engine, exphbs({
  extname: $config().views.extension,
  defaultLayout: $config().views.layout,
  layoutsDir: `${__dirname}/views/layouts`,
  partialsDir: `${__dirname}/views/partials`,
  helpers: hbsHelpers
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', $config().views.engine);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);
app.use('/users', users);

// Disabling X-powered-by
app.disable('x-powered-by');

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listening port...
app.listen($config().serverPort || 3000);

module.exports = app;
