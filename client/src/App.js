import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CourtList from "./components/Courts/CourtsList";
import AddCourt from "./components/Courts/AddCourt";
import EditCourt from "./components/Courts/EditCourt";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div>
          <h1>(App) is rendering!</h1>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courts" element={<CourtList />} />
          <Route path="/addCourt" element={<AddCourt />} />
          <Route path="/courts/edit/:id" element={<EditCourt />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
