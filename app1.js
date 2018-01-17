const express = require('express');

var app = express();

var stripe = require("stripe")(
  "sk_test_0vkMLQrr8bmZemAISJRiavya"
);

var data = stripe.customers.list(
  { limit: 3 },
  function(err, customers) {
    if(err) {
      console.log(err.message)
    }
    else{
      console.log(customers)
    }
  }
);