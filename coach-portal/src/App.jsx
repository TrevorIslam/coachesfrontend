import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'  // Import the Layout component
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import PendingApprovalPage from './pages/PendingApprovalPage'
import { AuthProvider } from './contexts/AuthContext'
import Profile from './pages/Profile'
import Availability from './pages/Availability'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/pending-approval" element={<PendingApprovalPage />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/availability" element={<Availability />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App