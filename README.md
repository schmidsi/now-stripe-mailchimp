Stripe Mailchimp now!
=====================

Simple microservice which runs on the awesome [zeit.co's now](https://zeit.co/now) (but probably also
everywhere else) which receives a stripe token, charges a certain amount and subscribes the corresponding
email directly to mailchimp. Great for deposits and similar stuff.

See it live on: http://www.opus-neoi.com

## Get started

1. Install [zeit.co's now](https://zeit.co/now)
1. Clone this repo and adjust it to your needs: Change the mailchimp list URI. And other stuff.
1. Add the following snippet somewhere on your website:

```html
<form action="https://your-endpoint.now.sh" method="POST">
  <script
      src="https://checkout.stripe.com/checkout.js" class="stripe-button"
      data-key="pk_live_YOUR_KEY"
      data-amount="2000"
      data-name="opus néoi"
      data-currency="chf"
      data-description="skinsure deposit"
      data-image="https://res.cloudinary.com/optune-me/image/upload/v1488551372/custom/opus-neoi.com/Logo2.png"
      data-locale="auto"
      data-label="Subscribe & Deposit"
      data-bitcoin="false"
      data-panel-label="Deposit CHF 20.00"
      >
  </script>
</form>
```

1. deploy with:
  now
  now alias ...

