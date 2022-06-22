import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import Auth from "./hoc/auth";
import NavBar from "./components/views/NavBar/NavBar";
import UploadProductPage from "./components/views/UploadProductPage/UploadProductPage";

function App() {
  const AuthLandingPage = Auth(LandingPage,null)
  const AuthLoginPage = Auth(LoginPage,false)
  const AuthRegisterPage = Auth(RegisterPage,false)
  const AuthUploadProductPage = Auth(UploadProductPage,true)


  return (
    <Router>
      <NavBar />
      <div>
        <hr />
        <Routes>
          <Route exact path="/" element={<AuthLandingPage />} />
          <Route exact path="/login" element={<AuthLoginPage />} />
          <Route exact path="/register" element={<AuthRegisterPage />} />
          <Route exact path="/product/upload" element={<AuthUploadProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
