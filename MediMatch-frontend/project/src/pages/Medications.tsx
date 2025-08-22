import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Trash2, Pill } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times?: string[];
  start_date: string;
}

export function Medications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = 10010;

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/medications/user/${userId}`)
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.detail || 'Failed to fetch medications');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        if (data && Array.isArray(data.medications)) {
          const meds = data.medications.map((med: any) => ({
            id: med.med_id || med._id || med.id,
            name: med.med_name || med.name,
            dosage: med.dosage,
            frequency: med.frequency,
            times: med.times ?? [],
            start_date: med.start_date,
          }));
          setMedications(meds);
          setError(null);
        } else {
          throw new Error("Unexpected data format: 'medications' array missing");
        }
      })
      .catch((err) => {
        console.error('Failed to fetch medications:', err);
        setError(err.message);
        setMedications([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: string) => {
    fetch(`http://127.0.0.1:8000/api/medications/user/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete medication');
        }
        setMedications((prev) => prev.filter((m) => m.id !== id));
      })
      .catch((err) => {
        console.error('Failed to delete medication:', err);
      });
  };

  if (loading) {
    return <div className="text-center py-8">Loading medications...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Error loading medications: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medications</h1>
          <p className="mt-2 text-gray-600">
            Manage your current medications and dosages
          </p>
        </div>
        <Button asChild>
          <Link to="/meds/new" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="h-5 w-5 mr-2 text-blue-600" />
            Current Medications ({medications.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {medications.length === 0 ? (
            <div className="text-center py-8">
              <Pill className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No medications added yet</p>
              <Button asChild>
                <Link to="/meds/new">Add Your First Medication</Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Times</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medications.map((med) => (
                  <TableRow key={med.id}>
                    <TableCell className="font-medium">{med.name}</TableCell>
                    <TableCell>{med.dosage}</TableCell>
                    <TableCell>{med.frequency}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(med.times ?? []).map((time, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{med.start_date}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Medication</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {med.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(med.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
