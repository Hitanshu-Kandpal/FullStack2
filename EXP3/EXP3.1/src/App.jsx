import { BrowserRouter, Routes, Route } from "react-router-dom";

const pageStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Arial, sans-serif",
  background: "linear-gradient(135deg, #141e30, #243b55)",
  color: "white",
};

function Home() {
  return (
    <div style={pageStyle}>
      <h1>Home Page</h1>
    </div>
  );
}

function Contact() {
  return (
    <div style={pageStyle}>
      <h1>Contact Page</h1>
    </div>
  );
}

function About() {
  return (
    <div style={pageStyle}>
      <h1>About Page</h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
