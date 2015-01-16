/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    /**
     * Create a user
     */
    create: function(req, res) {
        ParameterService.check(req, ['email', 'name', 'password'], function(err, parameters) {
            if (err) {
                res.json(err.httpCode, {error: err.message});
            } else {
                User.findOneByEmail(parameters.email, function (err, user) {
                    if (err) {
                        var err = ErrorService.databaseError();
                        res.json(err.httpCode, {error: err.message});
                    } else if (user) {
                        var err = ErrorService.userAlreadyExists();                        
                        res.json(err.httpCode, {error: err.message});
                    } else {
                        User.create({
                            email: parameters.email, 
                            name: parameters.name, 
                            password: parameters.password,
                        }).exec(function(err, user) {
                            if (err) {
                                var err = ErrorService.databaseError();
                                res.json(err.httpCode, {error: err.message});
                            } else {
                                module.exports.loginManager(parameters.email, parameters.password, function(err, value) {
                                    if (err) {
                                        var err = ErrorService.serverError();
                                        res.json(err.httpCode, {error: err.message});
                                    } else {
                                        res.json(200, {token: value});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    /**
     * Login as user
     */
    login: function(req, res) {
        ParameterService.check(req, ['email', 'password'], function(err, parameters) {
            if (err) {
                res.json(err.httpCode, {error: err.message});
            } else {
                module.exports.loginManager(parameters.email, parameters.password, function(err, value) {
                    if (err) {
                        res.json(err.httpCode, {error: err.message});
                    } else {
                        res.json({token: value}, 200);
                    }
                });
            }   
        });
    },
    /**
     * Login logic
     *
     * callback(err, token)
     */
    loginManager: function(email, password, callback) {
        User.findOneByEmail(email, function (err, user) {
            if (err) return callback(ErrorService.databaseError());

            if (user) {
                require('bcrypt').compare(password, user.password, function (err, match) {
                    if (err) return callback(ErrorService.databaseError());

                    if (match) {
                        TokenService.create(user, function(err, value) {
                            if (err) return callback(err);

                            return callback(null, value);
                        });
                    } else {
                        return callback(ErrorService.invalidPassword()); 
                    }
                });
            } else {
                return callback(ErrorService.userNotFound());
            }
        });
    },
};
