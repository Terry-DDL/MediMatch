/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const STRIPE_PK =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  'pk_test_51RrpqPIyxj79XoSA0w1OU1weYDqwASjyBYyPBF6RbETimnbYeojRuhgkzqiKBHodzJTyprvO158rAAXTBUelvHhg00dD8pGNmH';

export function Subscribe() {
  const [email, setEmail] = useState('');
  const [stripe, setStripe] = useState<any>(null);
  const [card, setCard] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!(window as any).Stripe || stripe) return;
    const stripeInstance = (window as any).Stripe(STRIPE_PK);
    const elements = stripeInstance.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');
    setStripe(stripeInstance);
    setCard(cardElement);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: { email },
    });

    if (error) {
      toast({
        title: 'Payment Error',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: email,
          paymentMethodId: paymentMethod.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Subscription failed');

      const paymentIntent = data.subscription?.latest_invoice?.payment_intent;
      if (paymentIntent && paymentIntent.status === 'requires_action') {
        await stripe.confirmCardPayment(paymentIntent.client_secret);
      }

      toast({
        title: 'Subscription Active',
        description: 'Thank you for subscribing!',
      });
    } catch (err: any) {
      toast({
        title: 'Subscription Failed',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Subscribe to Plus</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Payment Details</Label>
              <div id="card-element" className="p-2 border rounded" />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
            >
              Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Subscribe;
