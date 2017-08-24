const express = require("express");
const vendorRouter = express.Router();
var vendingData = require('../data.js');


vendorRouter.get("/money", (request, response) => {
  response.json( {"status": "success", "data": vendingData.money_accepted} 
    );
    console.log(vendingData);
}); 

vendorRouter.post("/items", (request, response) => {
  let itemData = request.body;
  console.log("itemData = ", itemData);
  vendingData.items.push(itemData);
  response.status(200).send("item is added");
}); 

vendorRouter.put("/items/:itemId", (request, response) => {
  let itemId = request.params.itemId;
  let itemData = request.body;
  vendingData.items.forEach(function(item) {
    if (item.id === itemId) {
      item.description = itemData.description;
      item.cost = itemData.cost;
      item.quantity = itemData.quantity;
    }
  });
  console.log("VENDING DATA ", vendingData);
  let updateData = request.body;
  console.log("itemData = ", itemData);
  vendingData.items.push(itemData);
  response.status(200).send("item is updated");
}); 

module.exports = vendorRouter;