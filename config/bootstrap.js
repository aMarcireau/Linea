/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
    Token.native(function (err, collection) {
        collection.ensureIndex({'createdAt': 1}, {expireAfterSeconds: 3600}, function(err, result) {
            if (err) {
                console.log('Error occured while ensuring index for Token')
                console.log(err);
            } else {
                cb();
            }
        });
    });
};
