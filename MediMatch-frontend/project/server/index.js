import http from 'http';

// Load Stripe credentials from environment variables or fall back to provided
// test keys. This ensures the server uses real Stripe data instead of mock
// placeholders when creating checkout sessions.
const STRIPE_SECRET_KEY =
  process.env.STRIPE_SECRET_KEY ||
  'sk_test_51RrpqPIyxj79XoSA3wvkOQpgbTUCjzmr8BYkkIP4LvezmnKIrSxo8vzsTPaEG4IRS9rFDqAGFeZkDGfTsuort6O800NX7i5ta8';
const PRICE_ID =
  process.env.STRIPE_PRICE_ID ||
  'price_1RrqmAIyxj79XoSAWERvedqI';

/**
 * Minimal HTTP server used by the frontend to initiate Stripe Checkout.
 * Expects the following environment variables:
 *  - STRIPE_SECRET_KEY: secret API key from Stripe dashboard
 *  - STRIPE_PRICE_ID: price identifier for the Plus subscription
 *  - CLIENT_URL: base URL of the frontend application
 */
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

if (!STRIPE_SECRET_KEY || !PRICE_ID) {
  throw new Error('Stripe configuration is missing. Set STRIPE_SECRET_KEY and STRIPE_PRICE_ID.');
}

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
