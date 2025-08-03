import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post('/create-subscription', async (req, res) => {
  try {
    const { customerEmail, paymentMethodId } = req.body;

    const customer = await stripe.customers.create({
      email: customerEmail,
      payment_method: paymentMethodId,
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: 'price_1RrqmAIyxj79XoSAWERvedqI' }],
      expand: ['latest_invoice.payment_intent'],
    });

    res.json({ subscription });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ error: { message } });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
