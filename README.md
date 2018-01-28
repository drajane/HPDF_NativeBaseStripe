# Stripe - Subscription Payment

## What is it?
Stripe - Subscription Payment is a CRNA mobile app which allows the merchants to set up recurring billing for the customers using Subscription feature.
This app integrates with the Stripe API via Node-Express backend to implement the Subscriptions smart engine of Stripe API for recurring payments.

## How it works?

### Workflow
The merchant needs to do the following on [Stripe Dashboard](https://dashboard.stripe.com/test/dashboard)
1. Create an account 
2. Configure Customers, Products and Subscription Plans
3. Associate a Credit Card with the Customer on Stripe Dashboard in case the billing is charged automatically

When the merchant opens the mobile app,
1. List of customers are displayed
2. Select a customer 
3. List of all subscription plans are displayed
4. Choose one or more subscription plans and click on 'Create Subscription' button
5. On 'Create Subscription' screen, the merchant has the option to either choose 'Automatically charge to credit card of the customer' or 'Send invoices by mail to customer' and click on 'Create Subscription' button
6. The subscription details such as ID, subscription period etc. are displayed on "Subscription Details' screen

### Internal Implementation
Every call for listing customers, listing subscription plans and create subscription is sent to the Node Express backend which invokes the [Stripe API](https://stripe.com/docs/api#intro) and sends the response back to front-end as JSON response.

## What does it use?
1. [Stripe API](https://stripe.com/docs/api#intro)

## Installation

Go to Git Bash terminal.

Install npm version 4.6.1

Run the following commands

```sh
$ git clone git@github.com:drajane/HPDF_NativeBaseStripe.git

$ cd HPDF_NativeBaseStripe/

$ npm install
```

### Run Node Express Back-end in command prompt

C:\> cd HPDF_NativeBaseStripe\src\node

C:\HPDF_NativeBaseStripe\src\node>set SECRET_KEY=xxxx (Get the Secret Key from your Stripe Account)

C:\> node server.js


### Run on Expo in Android

* Make sure you have an **Expo XDE** installed on your machine and **Expo app** installed in Android device.

* Open HPDF_NativeBaseStripe project in Expo XDE

* Click on 'Share' on the right side of the Expo XDE and QR code is displayed

* Open the Expo app in Android device and scan the QR code displayed on the Expo XDE in the machine

* The app will open on the Android device

### Developers
React-Native  : https://github.com/drajane/

Node Express  : https://github.com/vishalsoni242
