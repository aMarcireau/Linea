var Sails = require('sails')
var Barrels = require('barrels')

before(function(done) {
    Sails.lift({
        log: {
            level: 'error'
        },
        models: {
            connection: 'mongodb',
            migrate: 'drop'
        },
    }, function(err, sails) {
        if (err) return done(err);
        
        var barrels = new Barrels();
        fixtures = barrels.data;
        barrels.populate(function(err) {
            done(err, sails);
        });
    });
});

after(function(done) {
    Sails.lower(done);
});
