# MediMatch

This project includes a React frontend and a minimal Node.js backend that uses Stripe Checkout for Plus plan subscriptions.

## Running the backend

1. Install dependencies with `npm install`.
2. Set the environment variables `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID`.
3. From the project root, start the server:

   ```bash
   node server/index.js
   ```

The server exposes `/api/create-checkout-session` which returns a Stripe Checkout URL used by the frontend when upgrading to Plus.

## Development

- `npm run dev` – start Vite dev server
- `npm run lint` – run ESLint
- `npm run build` – type-check and build the production bundle
