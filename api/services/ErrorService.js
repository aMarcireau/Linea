/**
 * ErrorService
 *
 * @description :: Send http 400 if the required parameters are not found
 */

module.exports = {
    /**
     * Generic error
     */
    genericError: function(httpCode, errorMessage) {
        console.log('Error ' + httpCode + ' (' + errorMessage + ')')
        var error = new Error(errorMessage);
        error.httpCode = httpCode;

        return error;
    },
    /**
     * Database error
     */
    databaseError: function() {
        return module.exports.genericError(500, 'Database error');
    },
    /**
     * Server error
     */
    serverError: function() {
        return module.exports.genericError(500, 'Server error');
    },
    /**
     * Invalid password
     */
    invalidPassword: function() {
        return module.exports.genericError(400, 'Invalid password');
    },
    /**
     * User not found
     */
    userNotFound: function() {
        return module.exports.genericError(404, 'User not found');
    },
    /**
     * User already exists
     */
    userAlreadyExists: function() {
        return module.exports.genericError(409, 'User already exists');
    },
    /**
     * Missing parameter
     */
    missingParameter: function(parameter) {
        return module.exports.genericError(400, 'Missing ' + parameter + ' parameter');
    },
};
