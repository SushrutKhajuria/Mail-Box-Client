// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Compose from "./pages/Compose";
import Inbox from "./pages/Inbox";   
import Sent from "./pages/Sent";  

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/inbox" element={<Inbox />} />    
        <Route path="/sent" element={<Sent />} />       
      </Routes>
    </Router>
  );
}

export default App;
