/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    attributes: {
		transactions: {
			collection: 'Transaction',
			via: 'event',
		},
		lender: {
			model: 'User',
			required: true,
		},
		circle: {
			model: 'Circle',
			required: true,
		},
		amount: {
			type: 'float',
			required: true,
		},
    },
};
