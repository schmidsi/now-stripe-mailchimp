require('dotenv').config()

const { send } = require('micro')
const parse = require('urlencoded-body-parser')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


module.exports = async function (req, res) {
  const data = await parse(req)
  console.log(data)

  const charge = stripe.charges.create({
    amount: 2000,
    currency: 'chf',
    source: data.stripeToken,
    description: 'skinsure deposit - opus néoi GmbH',
  }, function(err, charge) {
    // console.log(err, charge);

    res.writeHead(302, {
    'Location': 'http://opus-neoi.webflow.io/success'
  });
  res.end();

    // send(res, 302, 'done');
  })
}
