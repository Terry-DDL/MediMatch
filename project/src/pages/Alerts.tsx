import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAlertStore } from '@/stores/alertStore';
import { AlertTriangle, X, Clock, Shield, Bell } from 'lucide-react';
import { format } from 'date-fns';

export function Alerts() {
  const { alerts, dismissAlert } = useAlertStore();
  
  const activeAlerts = alerts.filter(alert => !alert.dismissed);
  const dismissedAlerts = alerts.filter(alert => alert.dismissed);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'interaction':
        return <AlertTriangle className="h-5 w-5" />;
      case 'side-effect':
        return <Shield className="h-5 w-5" />;
      case 'missed-dose':
        return <Clock className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'interaction':
        return 'Drug Interaction';
      case 'side-effect':
        return 'Side Effect';
      case 'missed-dose':
        return 'Missed Dose';
      default:
        return 'Alert';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
        <p className="mt-2 text-gray-600">
          Stay informed about potential drug interactions, side effects, and medication reminders
        </p>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
            Active Alerts ({activeAlerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeAlerts.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-green-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No active alerts</p>
              <p className="text-sm text-gray-400">
                You're all caught up! We'll notify you of any new alerts.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 border rounded-lg bg-white shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`p-1 rounded-full ${getSeverityColor(alert.severity)}`}>
                          {getTypeIcon(alert.type)}
                        </div>
                        <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                          {getTypeLabel(alert.type)}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={getSeverityColor(alert.severity)}
                        >
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-900 font-medium mb-2">
                        {alert.message}
                      </p>
                      
                      {alert.medications && alert.medications.length > 0 && (
                        <div className="mb-2">
                          <p className="text-sm text-gray-600">
                            Related medications:
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {alert.medications.map((med, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                              >
                                {med}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-500">
                        {format(new Date(alert.date), 'MMM d, yyyy \'at\' h:mm a')}
                      </p>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissAlert(alert.id)}
                      className="ml-4 text-gray-400 hover:text-gray-600"
                      aria-label="Dismiss alert"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dismissed Alerts */}
      {dismissedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <X className="h-5 w-5 mr-2 text-gray-400" />
              Dismissed Alerts ({dismissedAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dismissedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 border rounded-lg bg-gray-50 opacity-75"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-1 rounded-full bg-gray-200 text-gray-400">
                      {getTypeIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="bg-gray-100 text-gray-600">
                          {getTypeLabel(alert.type)}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100 text-gray-600">
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500">Dismissed</span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(alert.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alert Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Bell className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                About Alerts
              </h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Drug Interactions:</strong> Potential harmful combinations between medications</p>
                <p><strong>Side Effects:</strong> Symptoms that may be related to your medications</p>
                <p><strong>Missed Doses:</strong> Reminders when medications haven't been taken</p>
              </div>
              <p className="text-xs text-blue-700 mt-2">
                Always consult with your healthcare provider before making any changes to your medications.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}