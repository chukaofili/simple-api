var Sails = require('sails');

before(function(done) {
    Sails.lift({
        connections: {
            testDB: {
                adapter: 'sails-disk'
            },
        },
        models: {
            connection: 'testDB',
        }
    }, function(err, sails) {
        if (err) return done(err);
        return done();
    });
});

after(function(done) {
    sails.lower(done);
});
