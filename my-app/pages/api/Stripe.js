const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type :'pay',
        mode: 'payment',
        payment_mehtod_types:['card'],
        billing_address_collection : 'auto',
        shipping_options:[
            {shipping_rate:'shr_1Lou61SDJHaLCnsxUv2dwLxU'},
            {shipping_rate:'shr_1Lou87SDJHaLCnsxVzelLUJv'},
        ],
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: '{{PRICE_ID}}',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
      }
      
      const session = await stripe.checkout.sessions.create(params);
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}