const router = require('express').Router();
const User = require('../db/user.js');
const UserBioData = require('../db/userBioData.js');

// routes mounted on /api/user

router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) res.status(401).send('User not found');
      else if (!user.hasMatchingPassword(req.body.password))
        res.status(401).send('Incorrect password');
      else {
        req.login(user, (err) => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

router.post('/update-data', async (req, res, next) => {
  try {
    const newData = UserBioData.create(req.body).data;
    res.send(newData);
  } catch (err) {
    next(err);
  }
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      req.login(user, (err) => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});
router.get('/signup', (req, res, next) => {
  try {
    res.send('test test get!');
  } catch (err) {
    next(err);
  }
});

router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
