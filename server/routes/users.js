/**
 * This file is to keep track of my work so I dont lose it.
 * */
app.get('/api/v1/login/:id',function (req, res) {
        res.send('I see you!!!')
    });

app.post('/api/v1/login', function (req, res) {
    res.send('Add Dat User!!!')
});

app.put('/api/v1/login/:user', function (req, res) {
    res.send('Update Dat User!!!')
});

app.get('/api/v1/users', function(req, res, next){

    console.log('Hit dat beotch!!!');

    var appUsers = [
        {
            id: 1,
            email: 'brice721@hotmail.com',
            username: 'brice721',
            password: 'QmV0YWJlZTEz'
        },
        {
            id: 2,
            email: 'lyfling83@gmail.com',
            username: 'charleyvin2',
            password: 'YW5kcmV3MjI5MDA='
        },
        {
            id: 3,
            email: 'afyan@att.net',
            username: 'fyan13',
            password: 'Y2FudXNfbHVwaXMxMw=='
        },
        {
            id: 4,
            email: 'belmor5827@yahoo.com',
            username: 'momma55',
            password: 'U2Nvb3RlcjU4Mjc='
        },
        {
            id: 5,
            email: 'troy@spire-web.com',
            username: 'troybeca1',
            password: 'dHJveWJlY2Ex'
        },
        {
            id: 6,
            email: 'brendan@hotmail.com',
            username: 'brendMAN13',
            password: 'YmZ5YW4xMw=='
        }
    ];
    console.log(appUsers);

    return res.json(appUsers);
});

app.post('/api/v1/users', function(req, res, next, checkUsers){

    checkUser(req, res, username);

    console.log('Hit dat beotch!!!');

    var appUsers = [
        {
            id: 1,
            email: 'brice721@hotmail.com',
            username: 'brice721',
            password: 'QmV0YWJlZTEz'
        },
        {
            id: 2,
            email: 'lyfling83@gmail.com',
            username: 'charleyvin2',
            password: 'YW5kcmV3MjI5MDA='
        },
        {
            id: 3,
            email: 'afyan@att.net',
            username: 'fyan13',
            password: 'Y2FudXNfbHVwaXMxMw=='
        },
        {
            id: 4,
            email: 'belmor5827@yahoo.com',
            username: 'momma55',
            password: 'U2Nvb3RlcjU4Mjc='
        },
        {
            id: 5,
            email: 'troy@spire-web.com',
            username: 'troybeca1',
            password: 'dHJveWJlY2Ex'
        },
        {
            id: 6,
            email: 'brendan@hotmail.com',
            username: 'brendMAN13',
            password: 'YmZ5YW4xMw=='
        }
    ];

    var username = req.query.username;

    function checkUser(req, res, username){
        if(_.includes({ 'username': username }, username) === true){
            alert('Username already taken');
        } else {
            alert('Good to go.');
            return res.json(appUsers);
        }
    }


});