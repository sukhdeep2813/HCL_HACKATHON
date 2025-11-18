<<<<<<< HEAD
function App() {
  return (
    <h1 className="text-3xl font-bold text-blue-600">
      Hello Tailwind!
    </h1>
  )
}

export default App
=======
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import PatientDashboard from './pages/PatientDashboard'
import ProviderDashboard from './pages/ProviderDashboard'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/layout/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route
          path="/dashboard/patient"
          element={
            <ProtectedRoute roles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/provider"
          element={
            <ProtectedRoute roles={['provider']}>
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
>>>>>>> 9bc86e0 (feat: build healthcare wellness frontend)
