import http from 'http';

const PORT = process.env.PORT || 3000;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const PRICE_ID = process.env.STRIPE_PRICE_ID || 'price_placeholder';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/create-checkout-session') {
    try {
      const params = new URLSearchParams({
        'line_items[0][price]': PRICE_ID,
        'line_items[0][quantity]': '1',
        mode: 'subscription',
        success_url: `${CLIENT_URL}/subscribe/success`,
        cancel_url: `${CLIENT_URL}/subscribe/cancel`,
      });

      const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });
      const data = await stripeRes.json();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ url: data.url }));
    } catch (err) {
      console.error('Stripe session error', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to create session' }));
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
