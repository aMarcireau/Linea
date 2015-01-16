/**
 * ParameterService
 *
 * @description :: Send http 400 if the required parameters are not found
 */

module.exports = {
    /**
     * Check parameters
     *
     * callback(err, parameters)
     */
    check: function(req, expectedParameters, callback) {
        var parameters = req.params.all();

        expectedParameters.forEach(function(parameterName) {
            if (null == parameters[parameterName]) {
                return callback(ErrorService.missingParameter(parameterName));
            }
        });

        return callback(null, parameters);
    },
};
