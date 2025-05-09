// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={< Signup />} />

      </Routes>
    </Router>
  );
}

export default App;
