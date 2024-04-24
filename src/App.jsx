
import './App.css'
import Dashboard from './components/Dashboard'
import ParentContext from './Context/ParentContext'

function App() {

  return (
    <ParentContext>
      <Dashboard />
    </ParentContext>
  )
}

export default App
