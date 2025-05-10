// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Compose from "./pages/Compose";
import Inbox from "./pages/Inbox";
import MailDetail from "./pages/MailDetail";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/compose"
          element={
            <ProtectedRoute>
              <Compose />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/sent"
          element={
            <ProtectedRoute>
              <Sent />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/mail/:mailId"
          element={
            <ProtectedRoute>
              <MailDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
