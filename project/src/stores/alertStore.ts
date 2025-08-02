import { create } from 'zustand';
import type { Alert } from '@/types';

interface AlertState {
  alerts: Alert[];
  dismissAlert: (id: string) => void;
  addAlert: (alert: Omit<Alert, 'id'>) => void;
}

// Mock data
const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'interaction',
    severity: 'high',
    message: 'Potential interaction between Lisinopril and NSAIDs',
    medications: ['Lisinopril'],
    date: '2024-12-19',
    dismissed: false,
  },
  {
    id: '2',
    type: 'side-effect',
    severity: 'medium',
    message: 'Nausea may be related to Metformin',
    medications: ['Metformin'],
    date: '2024-12-18',
    dismissed: false,
  },
];

export const useAlertStore = create<AlertState>((set) => ({
  alerts: mockAlerts,
  dismissAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === id ? { ...alert, dismissed: true } : alert
      ),
    })),
  addAlert: (alert) =>
    set((state) => ({
      alerts: [
        ...state.alerts,
        { ...alert, id: Date.now().toString() },
      ],
    })),
}));