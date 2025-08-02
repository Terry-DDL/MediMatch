import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

export function Subscribe() {
  const { upgradeToPlus } = useAuthStore();

  return (
    <div className="space-y-8">
      <div className="text-center py-16 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl font-bold mb-2">Get Plus</h1>
        <p className="text-lg">Unlock AI chat and premium features</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Free Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-center text-gray-700">
            <p>Browse medications</p>
            <p>Basic management tools</p>
            <p className="text-sm text-gray-500">No AI assistant access</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white">
          <CardHeader>
            <CardTitle className="text-center">Plus Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>
              Access to AI Assistant chat and future premium updates.
            </p>
            <Button
              className="bg-white text-yellow-700 hover:bg-gray-100"
              onClick={() => upgradeToPlus()}
            >
              Subscribe for $9.99/month
            </Button>
            <p className="text-xs text-white/90">
              Payments processed securely with Stripe.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
