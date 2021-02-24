const { db } = require('./server/db/index.js');
const app = require('./server/index.js');
const port = process.env.PORT || 3000;

db.sync().then(() => {
  console.log('hello', 'db synced');
  app.listen(port, () => {
    console.log('starting server!');
    console.log('look here!');
    console.log('hello', `your server is listening on port ${port}!`);
  });
});
