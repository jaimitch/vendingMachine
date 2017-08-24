const express = require("express");
const bodyParser = require("body-parser");
const customerRouter = require("./routes/customer");
const vendorRouter = require("./routes/vendor");
const application = express();
const port = 3000;
// var vendingData = require('./data.js');
// var purchaseData = require("./purchaseData.js");

// MIDDLEWARE
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
application.use("/main/customer", customerRouter);
application.use("/main/vendor", vendorRouter);

// LISTENER
application.listen(port, function() {
  console.log("Vending API running on port: ", port);
}); 


module.exports = application;

