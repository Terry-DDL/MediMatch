import { create } from 'zustand';
import type { Medication } from '@/types';

interface MedicationState {
  medications: Medication[];
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  deleteMedication: (id: string) => void;
  updateMedication: (id: string, medication: Partial<Medication>) => void;
}

// Mock data
const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    times: ['08:00'],
    startDate: '2024-01-01',
    notes: 'Take with food',
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    times: ['08:00', '20:00'],
    startDate: '2024-01-15',
    notes: 'Take with meals',
  },
];

export const useMedicationStore = create<MedicationState>((set) => ({
  medications: mockMedications,
  addMedication: (medication) =>
    set((state) => ({
      medications: [
        ...state.medications,
        { ...medication, id: Date.now().toString() },
      ],
    })),
  deleteMedication: (id) =>
    set((state) => ({
      medications: state.medications.filter((med) => med.id !== id),
    })),
  updateMedication: (id, updatedMedication) =>
    set((state) => ({
      medications: state.medications.map((med) =>
        med.id === id ? { ...med, ...updatedMedication } : med
      ),
    })),
}));