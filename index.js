const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const clientRoutes = require('./routes/client-routes');
const err = require('./middleware/errors');
const winston = require('winston');
const config = require('./startup/config');
const methodOverride = require('method-override');
const session = require('express-session');
const authRoutes = require('./routes/auth-routes');
const requireAuth = require('./middleware/auth');
const supplementalReportRoutes = require('./routes/supplemental-report-routes');

const app = express();

app.use((req, res, next) => {
    console.log('REQUEST:', req.method, req.url);
    next();
});

app.get('/test', (req, res) => {
    console.log("TEST ROUTE HIT");
    res.send('EXPRESS IS WORKING');
});


require('./startup/db')();
require('./startup/validations')();



app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,

        cookie: {
            httpOnly: true,
            sameSite: 'lax',

            maxAge:
                1000 *
                60 *
                60 *
                8
        }
    })
);



// Public authentication routes
app.use('/', authRoutes);


// Everything below this requires login
app.use(requireAuth);


// Protected application routes
app.use('/', clientRoutes);

app.use('/',supplementalReportRoutes);



app.listen(config.port, '0.0.0.0', () => {
    console.log(`Listening on port ${config.port}`);
});