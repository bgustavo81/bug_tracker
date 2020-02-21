const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./services/passport');


const app = express();
app.use(cors({ credentials: true }));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))


app.use(session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: true,
    // cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }, // 4 hours
}))



app.use(passport.initialize());
app.use(passport.session());




const bugRoutes = require('./routes/bugRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
// Routes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
app.use('/', bugRoutes);
app.use('/', commentRoutes);
app.use('/', userRoutes);
app.use('/', projectRoutes);

// allow CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', "*")
    res.setHeader("Content-Type", "application/json");
    next();
});






// if (process.env.NODE_ENV === "production") {
// // Set static folder
// app.use(express.static("client/build"));
// // server will serve up index.html file if it doesn't recognize the route
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });
// }


const PORT  = process.env.PORT || 5000;

app.listen(PORT);