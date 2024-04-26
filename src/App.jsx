
import { useLocation } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import ParentContext from './Context/ParentContext'
import AuthLayout from './components/Auth/AuthLayout';

function App() {

  const location = useLocation();

  const authPaths = ["/auth/login", "/auth/register", "/auth/register", "/auth/reset-password", "/auth/new-password"] 

  const showDashboard = authPaths.includes(location.pathname)

  return (
    <ParentContext>
      {!showDashboard && <Dashboard />}
      {showDashboard && <AuthLayout />}
    </ParentContext>
  )
}

export default App
