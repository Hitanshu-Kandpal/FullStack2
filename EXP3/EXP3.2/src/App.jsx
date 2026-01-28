import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const pageStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Arial, sans-serif",
  background: "linear-gradient(135deg, #141e30, #243b55)",
  color: "white",
  textAlign: "center",
};

const btnStyle = {
  marginTop: "12px",
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  background: "rgba(255,255,255,0.15)",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
};

function Profile() {
  return (
    <div style={pageStyle}>
      <marquee loop="5">
        <h1>Welcome to my profile</h1>
      </marquee>
      <h1>HITANSHU Kandpal</h1>
      <h2>Applied AI aspirant</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={pageStyle}>
      <h1>TO DO LIST: Have Fun in Life</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* Simple navigation */}
      <div style={{ position: "fixed", bottom: "20px", left: "20px" }}>
        <Link to="/profile">
          <button style={btnStyle}>Go to Profile</button>
        </Link>
        <br />
        <Link to="/dashboard">
          <button style={btnStyle}>Go to Dashboard</button>
        </Link>
      </div>
    </Router>
  );
}

export default App;
