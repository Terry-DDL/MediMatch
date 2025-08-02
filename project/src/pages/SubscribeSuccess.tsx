import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

export function SubscribeSuccess() {
  const { applyPlus } = useAuthStore();

  useEffect(() => {
    applyPlus();
  }, [applyPlus]);

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500">
          <CardTitle className="text-white text-2xl">You're Plus!</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <p>Your Plus subscription is now active. You can access AI chat.</p>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
          >
            <Link to="/chat">Go to AI Chat</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
