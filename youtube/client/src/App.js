import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import Auth from "./hoc/auth";
import NavBar from "./components/views/NavBar/NavBar";
import VideoUploadPage from "./components/views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./components/views/VideoDetailPage/VideoDetailPage";
import SubscriptionPage from "./components/views/Subscription/SubscriptionPage";

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthVideoUploadPage = Auth(VideoUploadPage, true);
  const AuthVideoDetailPage = Auth(VideoDetailPage, null);
  const AuthSubscriptionPage = Auth(SubscriptionPage, null);

  return (
    <Router>
      <NavBar />
      <div>
        <hr />
        <Routes>
          <Route exact path="/" element={<AuthLandingPage />} />
          <Route exact path="/login" element={<AuthLoginPage />} />
          <Route exact path="/register" element={<AuthRegisterPage />} />
          <Route path="/video/upload" element={<AuthVideoUploadPage />} />
          <Route path="/subscription" element={<AuthSubscriptionPage />} />
          <Route
            exact
            path="/video/:videoId"
            element={<AuthVideoDetailPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
