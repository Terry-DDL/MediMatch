export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  notes?: string;
}

export interface Symptom {
  id: string;
  name: string;
  severity: 1 | 2 | 3 | 4 | 5;
  date: string;
  notes?: string;
}

export interface Alert {
  id: string;
  type: 'interaction' | 'side-effect' | 'missed-dose';
  severity: 'low' | 'medium' | 'high';
  message: string;
  medications?: string[];
  date: string;
  dismissed: boolean;
}

export interface DashboardData {
  todaysMeds: Array<{
    medication: Medication;
    times: Array<{
      time: string;
      taken: boolean;
    }>;
  }>;
  recentSymptoms: Symptom[];
  activeAlerts: Alert[];
}