var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var path = require("path");
var mongoose = require("mongoose");
var methodOverride = require("method-override"); // simulate DELETE and PUT (express4)
var Form = require("./model/form.js");
var Login = require("./model/login.js");
var app = express();
var port = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(morgan("dev"));

app.use(express.static(__dirname + "/build"));

app.use(methodOverride());


var url = "mongodb://root:root@ds011725.mlab.com:11725/resourcifi";
mongoose.connect(url, function(err, db) {
  if (err) {
    console.log("Unable to connect to MongoDb server. Error: ", err);
  } else {
    console.log("Mongodb Connection established successfully at: ", url);
  }
});

//cross origin resource sharing access permission attached in Header section 

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type, Authorization, Cache-Control"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    return next();
  });


  app.post("/form", function(req, res) {
    Form.create(
      {
        fname: req.body.fname,
        lname : req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        postal : req.body.postal,
        country : req.body.country,
        Comments : req.body.Comments
      },
      function(err, form) {
        if (err)
          return res
            .status(500)
            .send("There is a problem in insertion data in Mlab");
        res.status(200).send(form);
      }
    );
  });

  app.get("/form", function(req, res) {
    Form.find({}, function(err, form) {
      if (err)
        return res
          .status(500)
          .send("There is a problem in retriving data from Mlab");
      res.status(200).send(form);
    });
  });

  app.get("/form/:id", function(req, res) {
    Form.find(
      {
        _id: req.params.id
      },
      function(err, form) {
        if (err)
          return res
            .status(500)
            .send("Problem in retriving data for particular user");
        if (!form) return res.status(404).send("User does not exists");
        res.status(200).send(form);
      }
    );
  });

  app.post("/login", function(req, res) {
    Login.create(
      {
        email: req.body.email,
        password: req.body.password
      },
      function(err, form) {
        if (err)
          return res
            .status(500)
            .send("There is a problem in insertion data in Mlab");
        res.status(200).send(form);
      }
    );
  });

  app.get("/login", function(req, res) {
    Login.find({}, function(err, login) {
      if (err)
        return res
          .status(500)
          .send("There is a problem in retriving data from Mlab");
      res.status(200).send(login);
    });
  });


  app.listen(port, function() {
    console.log("Server is running at: ", port);
  });
  
  module.exports = app;