const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

const keys = require('./config/keys');


// CORS and middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))


//Defining routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/bugs", require("./routes/bugRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/billing", require("./routes/billingRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// //Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//     //Set static folder
//     app.use(express.static("client/build"));
  
//     app.get("*", (req, res) => {
//       res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
//   };

const PORT  = process.env.PORT || 5000;

let server = app.listen(PORT);