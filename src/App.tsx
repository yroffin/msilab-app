import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicPage from './pages/PublicPage';
import MembersPage from './pages/MembersPage';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter basename="/msilab-app/">
      <Routes>
        {/* Public zone — cached offline by the Service Worker */}
        <Route path="/" element={<PublicPage />} />

        {/* Members zone — requires a valid session; never cached by SW */}
        <Route
          path="/members/*"
          element={
            <PrivateRoute>
              <MembersPage />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
