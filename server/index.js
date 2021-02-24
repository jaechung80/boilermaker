const express = require('express');
const path = require('path');
const app = express();
const db = require('./db/database.js');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || 3000;

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();

// app.listen(port, () => {
//   console.log('starting server!');
//   console.log('look here!');
//   console.log('hello', `your server is listening on port ${port}!`);
// });

// logging middleware
const morgan = require('morgan');
app.use(morgan('dev'));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

// body parsing middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'some secret',
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch(done);
});

app.use('/api', require('./api'));

// send index.html if no path matches
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// error handling
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
