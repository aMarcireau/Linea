var supertest = require('supertest');

describe('UserController', function() {
    var users = [
        {name: 'Alex', email: 'alexandre.marcireau@student.ecp.fr', password: 'testtest', expected: [200, 200]},
        {name: 'Bob', email: 'bob@gmail.com', password: 'testtest', expected: [200, 200]},
        {name: 'Alex bis', email: 'alexandre.marcireau@student.ecp.fr', password: 'dummyPass', expected: [409, 400]},
    ];

    users.forEach(function(user) {
        describe('create ' + user.name, function() {
            it('should return ' + user.expected[0], function(done) {
                supertest(sails.hooks.http.app).post('/user/create').send({
                    name: user.name,
                    email: user.email,
                    password: user.password, 
                }).expect(user.expected[0], done);
            });
        });

        describe('login ' + user.name, function() {
            it('should return ' + user.expected[1], function(done) {
                supertest(sails.hooks.http.app).post('/login').send({
                    email: user.email, 
                    password: user.password, 
                }).expect(user.expected[1], done);
            });
        });

        describe('login again ' + user.name, function() {
            it('should return ' + user.expected[1], function(done) {
                supertest(sails.hooks.http.app).post('/login').send({
                    email: user.email, 
                    password: user.password, 
                }).expect(user.expected[1], done);
            });
        });
    });
});
