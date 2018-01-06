var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

app.use(cors());

//connect to database
var db = mongoose.connect('mongodb://localhost/used_car_data');

var Autos = require('./models/schema');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));

//Test API to test connections with Database and 
app.get('/testconn', function (req, res) {
    //get brand, year of registration and kilometer unique values
    Autos.find( function (err, cars) {
        if (err) {
            res.status(500).send("Error loading from database");
        } else {
            res.status(200).send(cars);
        }
    }).limit(20);
});

//API to initially load dropdown lists
app.get('/loadddl', function (req, res) {
    //get brand, year of registration and kilometer unique values

    Autos.aggregate([
        {
            $group: {
                _id: null,
                brand: {
                    $addToSet: '$brand'
                },
                kilometer: {
                    $addToSet: '$kilometer'
                },
                yearOfRegistration: {
                    $addToSet: '$yearOfRegistration'
                }
            }
        }
    ], function (err, cars) {
        if (err) {
            res.status(500).send("Error loading from database" + err);
        } else {
            res.status(200).send(cars);
        }
    });
});

//API to get models od a specific brand
app.post('/getmodels', function (req, res) {
    var brand = req.body.brand;
    //res.send("brand recieved : " + brand);
    Autos.find({
        'brand': brand
    }, function (err, cars) {
        if (err) {
            res.status(500).send("Error loading from database");
        } else {
            res.status(200).send(cars);
        }
    });
});

//API to get expected price
app.post('/getexpectedprice', function (req, res) {
    var brand = req.body.brand;
    var model = req.body.model;
    var kms = req.body.kms;
    var regisYear = req.body.regisYear;
    //res.send("brand : " + brand + "   model : " + model + "   kms:" + kms + "   regisYear:" + regisYear);
    Autos.aggregate([{
            $match: {
                brand: brand,
                model: model,
                yearOfRegistration: regisYear,
                kilometer: kms
            }
        },
        {
            $group: {
                _id: null,
                priceAvg: {
                    $avg: "$price"
                }
            }
        }
    ], function (err, result) {
        if (err) {
            res.status(500).send("Error loading from database" + err);
        } else {
            res.status(200).send(result);
        }
    });


});

app.listen(3000, function () {
    console.log("user car api server running on port 3000 after patch.....");
});
