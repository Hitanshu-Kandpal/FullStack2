import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [displayText, setDisplayText] = useState("BONJOUR");

  const handleSearch = (e) => {
    e.preventDefault();
    setDisplayText(searchText);
  };

  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0;
          width: 100%;
          height: 100%;
        }

        .page-root {
          width: 100vw;
          min-height: 100vh;
          background: linear-gradient(120deg, #1e293b, #020617);
        }

        .floating-nav {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          max-width: 900px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 14px;
          padding: 12px 20px;
          color: white;
        }

        .center-area {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
        }
      `}</style>

      <div className="page-root">
        <div className="floating-nav d-flex align-items-center">
          <strong className="me-auto">Navbar</strong>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn btn-outline-info" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="center-area">
          <h1>{displayText || "World"}</h1>
        </div>
      </div>
    </>
  );
}

export default App;
