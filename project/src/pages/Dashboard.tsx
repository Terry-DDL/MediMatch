import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMedicationStore } from '@/stores/medicationStore';
import { useSymptomStore } from '@/stores/symptomStore';
import { useAlertStore } from '@/stores/alertStore';
import { Clock, Pill, AlertTriangle, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

export function Dashboard() {
  const { medications } = useMedicationStore();
  const { symptoms } = useSymptomStore();
  const { alerts } = useAlertStore();

  const activeAlerts = alerts.filter((alert) => !alert.dismissed);
  const recentSymptoms = symptoms
    .slice(-3)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Mock today's medications schedule
  const todaysMeds = medications.map((med) => ({
    ...med,
    nextDose: med.times[0] || '08:00',
    taken: Math.random() > 0.5, // Random for demo
  }));

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Health Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Your personalized medication safety overview powered by intelligent health monitoring.
        </p>
      </div>

      {/* Active Alerts Banner */}
      {activeAlerts.length > 0 && (
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              🚨 Critical Health Alerts ({activeAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {activeAlerts.slice(0, 2).map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border shadow-sm"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(alert.date), 'MMM d, yyyy')}
                  </p>
                </div>
                <Badge className={getSeverityColor(alert.severity)}>
                  {alert.severity}
                </Badge>
              </div>
            ))}
            {activeAlerts.length > 2 && (
              <p className="text-sm text-orange-700 mt-2">
                +{activeAlerts.length - 2} more alerts
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today's Medications */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-white to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              📋 Today's Medication Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todaysMeds.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No medications scheduled for today
              </p>
            ) : (
              <div className="space-y-3">
                {todaysMeds.map((med) => (
                  <div
                    key={med.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3">
                      <Pill className={`h-5 w-5 ${med.taken ? 'text-green-600' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-medium text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-500">
                          {med.dosage} • Next: {med.nextDose}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={med.taken ? 'default' : 'secondary'}
                      className={med.taken ? 'bg-green-100 text-green-800' : ''}
                    >
                      {med.taken ? 'Taken' : 'Due'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Symptoms */}
        <Card className="bg-gradient-to-br from-white to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
              📊 Symptom Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentSymptoms.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No recent symptoms
              </p>
            ) : (
              <div className="space-y-3">
                {recentSymptoms.map((symptom) => (
                  <div key={symptom.id} className="p-3 border rounded-lg bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">{symptom.name}</p>
                      <Badge variant="outline">
                        {symptom.severity}/5
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">
                      {format(new Date(symptom.date), 'MMM d, yyyy')}
                    </p>
                    {symptom.notes && (
                      <p className="text-sm text-gray-600 mt-1">
                        {symptom.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Pill className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {medications.length}
                </p>
                <p className="text-blue-700 font-medium">Active Medications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {symptoms.length}
                </p>
                <p className="text-purple-700 font-medium">Symptoms Tracked</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {activeAlerts.length}
                </p>
                <p className="text-orange-700 font-medium">Health Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* MediMatch Intelligence Info */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🧠 Powered by MediMatch Intelligence
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Our AI continuously monitors your medications against medical databases (OpenFDA, DrugBank) 
              to detect interactions, predict side effects, and provide personalized health insights.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-white p-3 rounded-lg">
                <div className="font-medium text-blue-600">Drug Interactions</div>
                <div className="text-gray-500">Real-time checking</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-medium text-purple-600">Side Effect Prediction</div>
                <div className="text-gray-500">Evidence-based alerts</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-medium text-green-600">Symptom Correlation</div>
                <div className="text-gray-500">Pattern recognition</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-medium text-orange-600">Smart Notifications</div>
                <div className="text-gray-500">Email & SMS alerts</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}