require('dotenv').config()

const { send } = require('micro')
const parse = require('urlencoded-body-parser')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const rp = require('request-promise')


module.exports = async function (req, res) {
  const data = await parse(req)

  const mailchimpAnswer = await rp({
    method: 'POST',
    auth: {
      'user': 'stripe-microservice',
      'pass': process.env.MAILCHIMP_API_KEY,
    },
    uri: process.env.MAILCHIMP_LIST_URI,
    body: {
        "email_address": data.stripeEmail,
        "status": "subscribed",
    },
    json: true,
    simple: false,
  })

  const charge = stripe.charges.create({
    amount: 2000,
    currency: 'chf',
    source: data.stripeToken,
    description: 'skinsure deposit - opus néoi GmbH',
  }, function(err, charge) {
    console.log('new deposit!', {
      email: data.stripeEmail,
      mailchimp: mailchimpAnswer.title || mailchimpAnswer.status,
      stripeId: charge.id
    })

    res.writeHead(302, {
      'Location': 'http://opus-neoi.webflow.io/success'
    });

    res.end();
  })
}
