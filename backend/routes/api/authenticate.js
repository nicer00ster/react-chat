const Message = require('../../models/Message');
const User = require('../../models/User');
const Channel = require('../../models/Channel');
const UserSession = require('../../models/UserSession');
const bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
  app.post('/api/account/register', (req, res, next) => {
    const { username, password } = req.body;

    if(!username) {
      return res.send({
        success: false,
        message: 'Error: Username name cannot be empty.',
      });
    }
    if(!password) {
      return res.send({
        success: false,
        message: 'Error: Password field cannot be empty.',
      });
    }

    User.find({
      username: username,
    }, (err, prevUser) => {
      if (prevUser.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exists.',
        });
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
            id: sessions[0].uid,
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

  // deprecating this route since it just gets all channels
  app.get('/api/channels', (req, res) => {

    Channel.find({},{ name: 1, id:1, _id:0 }, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      // res.json(data);
      res.send({
        success: true,
        message: 'Successfully fetched all channels.',
        data: data,
      });
    });
  });

  // this route returns all channels including private channels for that user
  app.get('/api/channels/:name', (req, res) => {

    Channel.find({ $or: [{ between: req.params.name }, { private: false }] }, {
      name: 1,
      id:1,
      private: 1,
      between: 1,
      _id:0
    }, (err, data) => {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json(data);
    });
  })

  // post a new user to channel list db
  app.post('/api/channels/new', (req, res) => {
    const channel = new Channel(req.body);
    channel.save((err, data) => {
      if(err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error'});
      }
      console.log(data);
      res.send({
        success: true,
        message: 'Created new channel.',
        data: data,
      })
    });
  });

  // query DB for ALL messages
 app.get('/api/messages', (req, res) => {
   Message.find({}, {
     id: 1,
     channel: 1,
     message: 1,
     user: 1,
     timestamp: 1,
     _id: 1,
   }, (err, data) => {
     console.log('fetching messages here', data);
     if(err) {
       console.log(err);
       return res.status(500).json({ message: 'internal server error' });
     }
     res.send({
       success: true,
       message: 'Successfully fetched messages.',
       data: data,
     });
   });
 });

 app.get('/api/messages/:channel', (req, res) => {
   Message.find({ channelID: req.params.channel }, {
     id: 1,
     channelID: 1,
     text: 1,
     user: 1,
     time: 1,
     _id: 0
   }, (err, data) => {
     if(err) {
       console.log(err);
       return res.status(500).json({ message: 'internal server error' });
     }
     res.json(data);
   });
 })

 //post a new message to db
 app.post('/api/messages/new', function(req, res) {
   const message = new Message(req.body);
   message.save((err, data) => {
     if(err) {
       console.log(err);
       return res.status(500).json({ message: 'internal server error' });
     }
     console.log('new', data);
     res.send({
       success: true,
       message: 'New message posted.',
       data: data,
     })
   });
 });

};
