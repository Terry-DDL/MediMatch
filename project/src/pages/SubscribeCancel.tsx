import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SubscribeCancel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Cancelled</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your subscription process was cancelled. You can try again anytime.</p>
        </CardContent>
      </Card>
    </div>
  );
}
