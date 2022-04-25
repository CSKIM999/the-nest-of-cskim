import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from './LandingPage/LandingPage'
import LoginPage from './LoginPage/LoginPage'
import RegisterPage from './RegisterPage/RegisterPage'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;

