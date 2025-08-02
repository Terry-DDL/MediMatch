import { create } from 'zustand';
import type { Symptom } from '@/types';

interface SymptomState {
  symptoms: Symptom[];
  addSymptom: (symptom: Omit<Symptom, 'id'>) => void;
  deleteSymptom: (id: string) => void;
}

// Mock data
const mockSymptoms: Symptom[] = [
  {
    id: '1',
    name: 'Headache',
    severity: 3,
    date: '2024-12-19',
    notes: 'Mild headache in the morning',
  },
  {
    id: '2',
    name: 'Nausea',
    severity: 2,
    date: '2024-12-18',
    notes: 'After taking medication',
  },
];

export const useSymptomStore = create<SymptomState>((set) => ({
  symptoms: mockSymptoms,
  addSymptom: (symptom) =>
    set((state) => ({
      symptoms: [
        ...state.symptoms,
        { ...symptom, id: Date.now().toString() },
      ],
    })),
  deleteSymptom: (id) =>
    set((state) => ({
      symptoms: state.symptoms.filter((symptom) => symptom.id !== id),
    })),
}));