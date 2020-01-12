const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const bugRoutes = require('./routes/bugRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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

app.use((error, req, res, next) => {
    console.log(error);
    const status = eror.stateCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
})

const PORT  = process.env.PORT || 5000;

app.listen(PORT);