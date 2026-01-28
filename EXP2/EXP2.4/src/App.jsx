import React from "react";

function App() {
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
          background: radial-gradient(circle at top, #0f172a, #020617);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: system-ui, sans-serif;
        }

        .panel {
          width: 100%;
          max-width: 420px;
          background: #020617;
          color: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.7);
        }

        .panel input {
          width: 100%;
          padding: 12px;
          margin-bottom: 16px;
          border-radius: 8px;
          border: none;
          background: #0f172a;
          color: white;
        }

        .panel button {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: #22d3ee;
          color: #020617;
          font-weight: 700;
        }
      `}</style>

      <div className="page-root">
        <div className="panel">
          <h2 className="mb-3">Material UI Component</h2>
          <input placeholder="Enter Text" />
          <button>SUBMIT</button>
        </div>
      </div>
    </>
  );
}

export default App;
