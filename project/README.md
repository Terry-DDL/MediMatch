# MediMatch

This project includes a React frontend and a minimal Node.js backend that uses Stripe Checkout for Plus plan subscriptions.

## Running the backend

1. Install dependencies with `npm install`.
2. The server uses Stripe test credentials by default:

   ```bash
   STRIPE_SECRET_KEY=sk_test_51RrpqPIyxj79XoSA3wvkOQpgbTUCjzmr8BYkkIP4LvezmnKIrSxo8vzsTPaEG4IRS9rFDqAGFeZkDGfTsuort6O800NX7i5ta8
   STRIPE_PRICE_ID=price_1RrqmAIyxj79XoSAWERvedqI
   ```

   You can override these by setting `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` in your environment.
3. From the project root, start the server:

   ```bash
   node server/index.js
   ```

The server exposes `/api/create-checkout-session` which returns a Stripe Checkout URL used by the frontend when upgrading to Plus.

## Development

- `npm run dev` – start Vite dev server
- `npm run lint` – run ESLint
- `npm run build` – type-check and build the production bundle
