const apiApp = require("./main");
const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
chai.should(); 
const request = require("supertest");

describe("GET /main/customer/items", function() {
  it("should return successfully", function(done) {
    request(apiApp)
      .get("/api/customer/items")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
        response.body.data[0].id.should.be.above(-1);
        assert.equal(res.body.data[0].description, "Corn chips");
        response.body.data[0].cost.should.be.above(0);
        response.body.data[0].quantity.should.be.above(-1);
      })
      .end(done);
  });
});

describe("POST /main/customer/items/:itemId/purchases", function() {
  it("should return successfully", function(done) {
    const newItem = {
            "money_given": 130
        }
    request(apiApp)
      .post("/main/customer/items/2/purchases")
      .send(newItem)
      .expect(200)
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
        assert.equal(res.body.data.message, "ENJOY YOUR PURCHASE");
        assert.equal(res.body.data.money_given, 130);
        assert.equal(res.body.data.money_required, 35);
        assert.equal(res.body.data.change_returned, 95);
      })
      .end(done);
  });
});

describe("GET /main/vendor/purchases", function() {
  it("should return successfully", function(done) {
    request(apiApp)
      .get("/api/vendor/purchases")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
        response.body.data[0].id.should.be.above(0);
        response.body.data[0].description.should.not
      })
      .end(done);
  });
});

describe("GET /main/vendor/money", function() {
  it("should return successfully", function(done) {
    request(apiApp)
      .get("/api/vendor/money")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
        response.body["data"].should.be.above(0);
      })
      .end(done);
  });
});

describe("POST /main/vendor/items", function() {
  it("should return successfully", function(done) {
    const newItem = {
            "id": 5,
            "description": "Coffee",
            "cost": 100,
            "quantity": 10
        }
    request(apiApp)
      .post("/main/vendor/items")
      .send(newItem)
      .expect(200)
      .expect("item is added")
      .end(done);
  });
});

describe("PUT /main/vendor/items/:itemId", function() {
  it("should return successfully", function(done) {
    const updateItem = {
            "description": "Bubble Gum",
            "cost": 25,
            "quantity": 100
        }
    request(apiApp)
      .put("/main/vendor/items/2")
      .send(updateItem)
      .expect(200)
      .expect("item is updated")
      .end(done);
  });
});