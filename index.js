const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./services/passport');


const app = express();
const bodyParser = require('body-parser');
const bugRoutes = require('./routes/bugRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', "*")
    res.setHeader("Content-Type", "application/json");
    next();
});

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
app.use('/', bugRoutes);
app.use('/', commentRoutes);
app.use('/', userRoutes);

app.get('/', (req, res, next) => {
    res.send({homepage: "hello"})
})


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.stateCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
})

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets 
    // like our main.js file or main.css file
    app.user(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get("*", (req, res, next) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}


const PORT  = process.env.PORT || 5000;

app.listen(PORT);