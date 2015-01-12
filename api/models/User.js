/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    attributes: {
		email: {
			type: 'email',
			unique: true,
			required: true,
		},
		name: {
			type: 'string',
			required: true,
		},
		password: { 
			type: 'string',
			required: true,
			minLength: 8,
		},
		accounts: {
			collection: 'Account',
			via: 'user',
		},
		lendings: {
			collection: 'Event',
			via: 'lender',
		},
		borrowings: {
			collection: 'Transaction',
			via: 'borrower',
		},
    },
    beforeCreate: function(attrs, next) {
    	var bcrypt = require('bcrypt');

   		bcrypt.genSalt(10, function(err, salt) {
      		if (err) { 
      			return next(err);
      		}
			bcrypt.hash(attrs.password, salt, function(err, hash) {
        		if (err) { 
        			return next(err);
        		}
        		attrs.password = hash;
        		next();
      		});
    	});
  	}
};
