import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';

export function SubscribeSuccess() {
  const { applyPlus } = useAuthStore();

  useEffect(() => {
    applyPlus();
  }, [applyPlus]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Active</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your Plus subscription is now active. You can access AI chat.</p>
        </CardContent>
      </Card>
    </div>
  );
}
