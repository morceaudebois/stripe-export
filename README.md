This is a small Node script that uses the Stripe API to export your transactions with their country of origin (which isn't possible to do with Stripe's official tools).

All neatly documented on my blog post: https://tahoe.be/post/export-stripe-transactions-with-country

But it short if you want to use it:

1. Install Node
2. Clone the repo & `cd` to it
3. Create a Stripe restricted API key
4. Run this command: `STRIPE_SECRET_KEY=replace_with_your_API_key node export.js`
