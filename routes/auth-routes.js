const express = require('express');

const router = express.Router();


router.get('/login', (req, res) => {

    if (req.session.authenticated) {
        return res.redirect('/');
    }

    res.render('login', {
        error: null
    });

});


router.post('/login', (req, res) => {

    const {
        username,
        password
    } = req.body;


    if (
        username === process.env.APP_USERNAME &&
        password === process.env.APP_PASSWORD
    ) {

        req.session.authenticated = true;
        req.session.username = username;

        return res.redirect('/');
    }


    return res.status(401).render('login', {
        error: 'Invalid username or password.'
    });

});


router.get('/logout', (req, res) => {

    req.session.destroy((error) => {

        if (error) {

            console.error(
                'Logout Error:',
                error
            );

            return res.status(500).send(
                'Unable to log out'
            );
        }

        res.redirect('/login');

    });

});


module.exports = router;