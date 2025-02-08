import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Sidebar } from "./components/Sidebar";
import CandidateForm from "./pages/CandidateForm";
import CandidateProfile from "./pages/CandidateProfile";
import AboutPage from "./pages/AboutPage";
import ContactUs from "./pages/ContactUs"; // Add this import

// PrivateRoute to restrict access based on authentication
const PrivateRoute = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (
      <div className="flex w-full">
        <div className="w-1/4">
          <Sidebar />
        </div>

        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    )  // Renders the child routes of PrivateRoute
  } else {
    return <Navigate replace to="/signin" />;  // Redirects to login page
  }
};

// Adding propTypes for PrivateRoute
PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/candidateform" element={<CandidateForm />} />
        <Route path="/aboutpage" element={<AboutPage />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/candidateprofile" element={<CandidateProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;