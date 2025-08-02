export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'plus';
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

