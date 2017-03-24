var request = require('supertest');

describe('AuthController Tests', function() {
    before(function(done){
        return done();
    });

    describe('#HealthCheck()', function (){
        it('should return 200: Instance online and active', function (done){
            request(sails.hooks.http.app)
            .get('/health')
            .expect(200)
            .end(function (err, res){
                if (err) return done(err);
                if (res) {
                    return done();
                }
            })
        })
    });
});
