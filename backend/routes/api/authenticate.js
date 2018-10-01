const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
  app.post('/api/account/register', (req, res, next) => {
    const { username, password } = req.body;

    if(!username) {
      return res.send({
        success: false,
        message: 'Error: Username name cannot be empty.'
      })
    }
    if(!password) {
      return res.send({
        success: false,
        message: 'Error: Password field cannot be empty.'
      })
    }

    User.find({
      username: username,
    }, (err, prevUser) => {
      if (prevUser.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exists.',
        })
      } else {
        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.generateHash(password);

        newUser.save((err, user) => {
          if(err) {
            return res.send({
              success: false,
              message: 'Error: Server error.'
            })
          } else {
            return res.send({
              success: true,
              message: 'Authenticated!',
              token: user._id,
              username: user.username,
            })
          }
        });
      }
    })
  })

  app.get('/api/account/users', (req, res, next) => {
    User.find({}, (err, users) => {
      const userMap = {};

      users.forEach(user => {
        userMap[user._id] = user;
      });

      res.send(userMap);
    });
  })

  app.post('/api/account/login', (req, res, next) => {
    const { username, password } = req.body;

    if(!username) {
      return res.send({
        success: false,
        message: 'Error: Username field cannot be empty.'
      })
    }
    if(!password) {
      return res.send({
        success: false,
        message: 'Error: Password field cannot be empty.'
      })
    }

    User.find({
      username: username
    }, (err, users) => {
      console.log('users', users);
      if(err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      }
      if(users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      const user = users[0];
      if(!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        })
      }

      const userSession = new UserSession();
      userSession.uid = user._id;
      userSession.username = user.username;
      userSession.isActive = true;
      userSession.save((err, doc) => {
        if(err) {
          return res.send({
            success: false,
            message: 'Error: Server error.'
          })
        }
        return res.send({
          success: true,
          message: 'Successfully signed in.',
          token: doc._id,
          username: doc.username,
        })
      })

    })

  })

  app.get('/api/account/verify', (req, res, next) => {
    const { query } = req;
    const { token } = query;
    let username;
    UserSession.find({
      _id: token,
      isActive: true
    }, (err, sessions) => {
      if(err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      }
      if(sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        User.findOneAndUpdate({
          username: sessions[0].username,
          isActive: false,
        }, {
          $set: { isActive: true }
        }, null, () => {
          return res.send({
            success: true,
            message: 'Successfully verified.',
            user: sessions[0].username,
          })
        });
      }
    })
  })

  app.get('/api/account/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;
    UserSession.findOneAndUpdate({
      _id: token,
      isActive: true
    }, {
      $set: { isActive: false }
    }, null, (err, sessions) => {
      if(err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      }
      if(sessions) {
        User.findOneAndUpdate({
          username: sessions.username,
          isActive: true,
        }, {
          $set: { isActive: false }
        }, null, () => {
          return res.send({
            success: true,
            message: 'Successfully logged out.'
          })
        });
      } else {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
    })
  });

};
