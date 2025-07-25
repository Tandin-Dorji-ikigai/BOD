// File: src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AttendantDashboard from './pages/fuelAttendent';
import DriverHomePage from './pages/DriverHomePage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/fuelAttendent" element={<AttendantDashboard />} />
        <Route path="/driver" element={<DriverHomePage />} />
      
      </Routes>
    </Router>
  );
}

export default App;
