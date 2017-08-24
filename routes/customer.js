const express = require("express");
const customerRouter = express.Router();
var vendingData = require('../data.js');

customerRouter.get("/items", (request, response) => {
  response.json( {"status": "success", "data": vendingData.items} 
    );
    console.log(vendingData);
}); 

customerRouter.post("/items/:itemId/purchases", (request, response) => {
  let purchaseData = request.body;
  console.log("purchaseData = ", purchaseData);

  vendingData.items.forEach(function(vending) {
    if (vending.id == request.params.itemId) {
      console.log(request.body.money_given); 
      if (vending.quantity > 0) {
          if (request.body.money_given >= vending.cost) {

            // TODO: subtract quantity / update items purchased

            response.status(200)
              response.send({ 
                "status": "success",
                "data": {
                  "money_given": req.body.money_given,
                  "money_required": vending.cost,
                  "change_returned": req.body.money_given - vending.cost,
                  "message": "ENJOY YOUR PURCHASE"
                }
            });
          } else { // not enough money
            response.status(200)
              response.send({ 
                "status": "fail",
                "data": {
                  "money_given": request.body.money_given,
                  "money_required": vending.cost,
                  "change_returned": request.body.money_given,
                  "message": "YOU DON'T HAVE ENOUGH MONEY FOR THIS ITEM"
                }
            });
          }
      } else { // out of stock
        response.status(200)
          response.send({ 
            "status": "fail",
            "data": {
              "money_given": request.body.money_given,
              "money_required": vending.cost,
              "change_returned": request.body.money_given,
              "message": "OUT OF STOCK"
            }
        });
      }
    }
  });
}); 

module.exports = customerRouter;