/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    /**
     * Login as user
     */
    login: function(req, res) {
        var bcrypt = require('bcrypt');

        User.findOneByEmail(req.params('email')).done(function (err, user) {
            if (err) { 
                res.json({error: 'database error'}, 500);
            }

            if (user) {
                bcrypt.compare(req.body.password, user.password, function (err, match) {
                    if (err) { 
                        res.json({ error: 'server error' }, 500);
                    }

                    if (match) {
                        req.session.user = user.email;
                        res.json(user);
                    } else {
                        if (req.session.user) {
                            req.session.user = null;
                        }
                        res.json({ error: 'invalid password' }, 400);
                    }
                });
            } else {
                res.json({ error: 'User not found' }, 404);
            }
        });
    }
};
