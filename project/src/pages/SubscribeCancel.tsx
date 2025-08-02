import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function SubscribeCancel() {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500">
          <CardTitle className="text-white text-2xl">Subscription Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <p>Your subscription process was cancelled. You can try again anytime.</p>
          <Button
            asChild
            variant="outline"
            className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white"
          >
            <Link to="/get-plus">Back to Plans</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
