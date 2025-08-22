import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

export function AddMedication() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    med_name: '',
    dosage: '',
    frequency: '',
    start_date: new Date().toISOString().split('T')[0],
  });

  const frequencies = [
    'Once daily',
    'Twice daily',
    'Three times daily',
    'Four times daily',
    'As needed',
    'Every other day',
    'Weekly',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { med_name, dosage, frequency, start_date } = formData;

    if (!med_name || !dosage || !frequency) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/medications/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // ✅ Replace with actual user ID if available
          med_name,
          dosage,
          frequency,
          start_date,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to add medication');
      }

      toast({
        title: 'Success',
        description: 'Medication added successfully',
      });

      navigate('/meds');
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/meds')}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Medications
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Medication</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="med_name">Medication Name *</Label>
                <Input
                  id="med_name"
                  value={formData.med_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, med_name: e.target.value }))}
                  placeholder="e.g., Lisinopril"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="dosage">Dosage *</Label>
                <Input
                  id="dosage"
                  value={formData.dosage}
                  onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
                  placeholder="e.g., 10mg"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="frequency">Frequency *</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq} value={freq}>
                      {freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start_date">Start Date *</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/meds')}
              >
                Cancel
              </Button>
              <Button type="submit">
                Add Medication
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}