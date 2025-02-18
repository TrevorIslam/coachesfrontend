import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'  // Import the Layout component
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { AuthProvider } from './contexts/AuthContext'
import Profile from './pages/Profile'
import Availability from './pages/Availability'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/availability" element={<Availability />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App