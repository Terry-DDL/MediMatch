import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

export function GetPlus() {
  const { upgradeToPlus } = useAuthStore();

  return (
    <div className="flex flex-col items-center text-center space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          MediMatch Plus
        </h1>
        <p className="mt-2 text-gray-600 max-w-md">
          Unlock AI chat and premium features by upgrading your plan.
        </p>
      </div>
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500">
          <CardTitle className="text-white text-2xl">$5/month</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <ul className="space-y-2 text-gray-700">
            <li>✔️ Chat with our AI assistant</li>
            <li>✔️ Priority feature access</li>
            <li>✔️ Support future development</li>
          </ul>
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
            onClick={() => upgradeToPlus()}
          >
            Get Plus
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
