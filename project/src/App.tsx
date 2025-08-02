import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { Medications } from '@/pages/Medications';
import { AddMedication } from '@/pages/AddMedication';
import { Symptoms } from '@/pages/Symptoms';
import { Alerts } from '@/pages/Alerts';
import { NotFound } from '@/pages/NotFound';
import { useAuthStore } from '@/stores/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="meds" element={<Medications />} />
            <Route path="meds/new" element={<AddMedication />} />
            <Route path="symptoms" element={<Symptoms />} />
            <Route path="alerts" element={<Alerts />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;