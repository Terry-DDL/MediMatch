import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';
import { Login } from '@/pages/Login';
import { Medications } from '@/pages/Medications';
import { AddMedication } from '@/pages/AddMedication';
import { Chat } from '@/pages/Chat';
import { NotFound } from '@/pages/NotFound';
import { SubscribeSuccess } from '@/pages/SubscribeSuccess';
import { SubscribeCancel } from '@/pages/SubscribeCancel';
import { GetPlus } from '@/pages/GetPlus';
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
              isAuthenticated ? <Navigate to="/meds" replace /> : <Login />
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
            <Route index element={<Navigate to="/meds" replace />} />
            <Route path="meds" element={<Medications />} />
            <Route path="meds/new" element={<AddMedication />} />
            <Route path="chat" element={<Chat />} />
            <Route path="get-plus" element={<GetPlus />} />
            <Route path="subscribe/success" element={<SubscribeSuccess />} />
            <Route path="subscribe/cancel" element={<SubscribeCancel />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
