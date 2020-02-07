const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const path = require('path');
require('./services/passport');


const app = express();
const bodyParser = require('body-parser');
const bugRoutes = require('./routes/bugRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

app.use(bodyParser.json());

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




app.use('/', bugRoutes);
app.use('/', commentRoutes);
app.use('/', userRoutes);
app.use('/', projectRoutes);
app.use('/', authRoutes);
app.use('/', billingRoutes);
app.use('/', surveyRoutes);

// if (process.env.NODE_ENV === "production") {
//     //express will serve up production assets like our //main.js file, or main.css file!!
//     app.use(express.static("client/build"));
    
  
//     //server will serve up the index.html file if it does
//     //not recognize the route
  
//     app.get("*", (req, res) => {
//       res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
//   }

if (process.env.NODE_ENV === "production") {
//Set static folder
app.use(express.static("client/build"));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
});
}


const PORT  = process.env.PORT || 5000;

app.listen(PORT);