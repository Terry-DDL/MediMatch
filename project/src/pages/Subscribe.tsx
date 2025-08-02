import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

export function Subscribe() {
  const { upgradeToPlus } = useAuthStore();

  return (
    <div className="space-y-8">
      <div className="text-center py-16 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl font-bold mb-2">Choose Your Plan</h1>
        <p className="text-lg">Compare Free and Plus options</p>
      </div>
      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle className="text-center">Free Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center flex-1 flex flex-col">
            <p className="text-gray-700 flex-1">Basic medication management features.</p>
            <p className="text-2xl font-bold">$0</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white flex flex-col">
          <CardHeader>
            <CardTitle className="text-center">Plus Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center flex-1 flex flex-col">
            <p className="flex-1">Access to AI Assistant chat and future premium updates.</p>
            <Button
              size="sm"
              className="bg-white text-yellow-700 hover:bg-gray-100"
              onClick={() => upgradeToPlus()}
            >
              Subscribe for $9.99/month
            </Button>
            <p className="text-xs text-white/80">Payments processed securely with Stripe.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
