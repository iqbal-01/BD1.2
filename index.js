const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

// Endpoint 1: Calculate the total price of items in the cart
//localhost:3000/cart-total?newItemPrice=1200&cartTotal=0
http: app.get('/cart-total', (req, res) => {
  let newItemPrice = req.query.newItemPrice;
  let cartTotal = req.query.cartTotal;

  cartTotal = parseFloat(cartTotal) + parseFloat(newItemPrice);
  res.json(cartTotal);
});

// Endpoint 2 : Apply a discount based on membership status
// http://localhost:3000/membership-discount?cartTotal=3600&isMember=true
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let newPrice = cartTotal;
  if (isMember == 'true') {
    newPrice = cartTotal - (cartTotal * discountPercentage) / 100;
  }
  res.json(newPrice);
});

//Endpoint 3 : Calculate tax on the cart total
//http://localhost:3000/calculate-tax?cartTotal=3600

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = (cartTotal * taxRate) / 100;
  res.json(tax);
});

//Endpoint 4 : Estimate delivery time based on shipping method
//http://localhost:3000/estimate-delivery?shippingMethod=express&distance=600
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let estimatedDeliveryTime = 'Not Defined';
  if (shippingMethod == 'standard') {
    estimatedDeliveryTime = distance / 50;
  } else if (shippingMethod == 'express') {
    estimatedDeliveryTime = distance / 100;
  }
  res.json(estimatedDeliveryTime);
});

// Endpoint 5 : Calculate the shipping cost based on weight and distance
// http://localhost:3000/shipping-cost?weight=2&distance=600
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let cost = weight * distance * 0.1;
  res.json(cost);
});

// Endpoint 6 : Calculate loyalty points earned from a purchase
// http://localhost:3000/loyalty-points?purchaseAmount=3600
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoint = purchaseAmount * loyaltyRate;
  res.json(loyaltyPoint);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
