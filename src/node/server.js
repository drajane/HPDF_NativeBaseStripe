const express = require('express');

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

var app = express();
const port = process.env.PORT || 3000;

const stripe = require("stripe")(keySecret);

app.get('/getListOfCustomers', (req, res) => {
  stripe.customers.list(
    { limit: 10 },
    function(err, customers) {
      if(err) {
        console.log(err)
      }
      else{
        console.log(customers)
        res.json(customers)
      }
    }
  )
});

app.get('/getListOfSubscriptionPlans', (req, res) => {
  stripe.plans.list(
    { limit: 10 },
    function(err, plans) {
      if(err) {
        console.log(err)
      }
      else{
        console.log(plans)
        res.json(plans)
      }
    }
  )
});

app.post('/createSubscription', (req, res) => {
  stripe.subscriptions.create({
    customer: "cus_C9TLtSYScGmqot",
    items: [
      {
        plan: "BasicMonthlyPlan",
      },
    ],
    billing:'send_invoice',
    days_until_due: 30
    //source: 'src_1BkaLTIgN6hknwupA3fkghyl'
  }, function(err, subscription) {
      if(err) {
        console.log(err)
      }
      else{
        console.log(subscription)
        res.json(subscription)
      }
    }
  );
});

app.post('/createSource', (req, res) => {
  stripe.sources.create({
    type: 'card',
    amount: 50,
    currency: 'usd',
    owner: {
      email: 'cust9@email.com'
    },
    token: 'tok_1BkaKtIgN6hknwupdZhjgVAn'
  }, function(err, source) {
    if(err) {
      console.log(err)
    }
    else{
      console.log(source)
      res.json(source)
    }
  });
});

app.get('/detachSource', (req, res) => {
  stripe.customers.deleteSource(
    "cus_C8SGrufiFJajmj",
    "src_1BkBRGIgN6hknwupr7BL6lwq",
    function(err, source) {
      if(err) {
        console.log(err)
      }
      else{
        console.log(source)
        res.json(source)
      }
    }
  );
});

/*app.get('/createToken', (req, res) => {
  stripe.tokens.create({
    card: {
      "number": '6011111111111117',
      "exp_month": 12,
      "exp_year": 2019,
      "cvc": '343'
    }
  }, function(err, token) {
    if(err) {
      console.log(err)
    }
    else{
      console.log(token)
      res.json(token)
    }
  });
});*/

app.listen(port, () => console.log(`Listening on port ${port}`));