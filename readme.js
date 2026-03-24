import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

function App() {

  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <ThemeToggle />
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {

  const { theme, setTheme } = useContext(ThemeContext);

  const style = {
    backgroundColor: theme === "light" ? "#ffffff" : "#333333",
    color: theme === "light" ? "#000000" : "#ffffff",
    height: "100vh",
    textAlign: "center",
    paddingTop: "50px"
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div style={style}>
      <h1>{theme} Mode</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default App;



import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h2>This is the Home Page</h2>;
}

function About() {
  return <h2>This is the About Page</h2>;
}

function App() {

  return (
    <BrowserRouter>

      <div style={{textAlign:"center"}}>

        <h1>React Routing Example</h1>

        <nav>
          <Link to="/">Home </Link>
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;