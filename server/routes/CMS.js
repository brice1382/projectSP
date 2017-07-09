var express = require('express');
var router = express.Router();

var app = express();

app.route('/api/v1/login')
    .get(function (req, res) {
        res.send('I see you!!!')
    })
    .post(function (req, res) {
        res.send('Add Dat User!!!')
    })
    .put(function (req, res) {
        res.send('Update Dat User!!!')
    });

router.use(function (req, res, next) {
    next();
});

router.post('/api/v1/users/:user', function(req, res, next) {
    alert('Post Totally Successful');
    res.send('Thumbs Up')
});

app.get('/api/v1/users', function(req, res, next){
    // This is where I will get users from the DB. Until then JSON HOMIE.......Thanks Troy
    users = {
        appUsers: [
            { id: 1, email: 'brice721@hotmail.com', username: 'brice721', password: 'Betabee13'},
            { id: 1, email: 'lyfling83@gmail.com', username: 'charleyvin2', password: 'andrew22900'},
            { id: 1, email: 'afyan@att.net', username: 'fyan13', password: 'canus_lupis13'},
            { id: 1, email: 'belmor5827@yahoo.com', username: 'momma55', password: 'Scooter5827'},
            { id: 1, email: 'troy@spire-web.com', username: 'troybeca1', password: 'troybeca1'},
            { id: 1, email: 'brendan@hotmail.com', username: 'brendMAN13', password: 'bfyan13'}
        ]
    };
});

module.exports = router;