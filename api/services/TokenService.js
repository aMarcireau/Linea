/**
 * TokenService
 *
 * @description :: Server-side utility for managing tokens
 */

module.exports = {
    /**
     * Create a token
     *
     * callback(err, value)
     */
    create: function(user, callback) {
        Token.destroy({user: user}).exec(function(err) {
            if (err) return callback(ErrorService.databaseError());

            require('crypto').randomBytes(48, function(ex, buf) {
                var value = buf.toString('hex');

                Token.create({value: value, owner: user}).exec(function(err, token) {
                    if (err) return callback(ErrorService.databaseError());

                    return callback(null, value);
                });
            });
        });
    },
};
