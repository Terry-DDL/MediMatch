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
      <Card className="max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Plus Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-700">
            Access to AI Assistant chat and future premium updates.
          </p>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            onClick={() => upgradeToPlus()}
          >
            Subscribe for $9.99/month
          </Button>
          <p className="text-xs text-gray-500">Payments processed securely with Stripe.</p>
        </CardContent>
      </Card>
    </div>
  );
}
