/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    attributes: {
		mail: {
			type: 'email',
			unique: true,
			required: true,
		},
		name: {
			type: 'string',
			required: true,
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
};
