import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Import BrowserRouter
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminForm from './components/Admin/AdminForm.jsX';
import ProtectedRoute from './ProtectedRoute';
import Events from './components/Participant/Events';
import ParticipantForm from './components/Participant/ParticipantForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Switch>
        <Route path = "/admin" component={AdminForm}/>
        <ProtectedRoute path = "/admin-dashboard" component={AdminDashboard}/>
        <Route path = "/" exact component={Events}/>
        <Route path = "/participate/:eventId" exact component={ParticipantForm}/>
      </Switch>
    </Router>
  )
}

export default App
