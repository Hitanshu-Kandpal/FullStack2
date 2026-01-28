import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        }

        .top-bar {
          width: 100%;
          background: linear-gradient(90deg, #22d3ee, #38bdf8);
          padding: 18px 0;
          color: #020617;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-align: center;
          box-shadow: 0 6px 18px rgba(0,0,0,0.4);
        }

        .center-wrap {
          width: 100%;
          min-height: calc(100vh - 70px);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .glass-box {
          width: 100%;
          max-width: 520px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
          color: white;
        }

        .glass-box input,
        .glass-box textarea {
          background: rgba(255,255,255,0.15);
          border: none;
          color: white;
        }

        .glass-box input::placeholder,
        .glass-box textarea::placeholder {
          color: #cbd5f5;
        }

        .glass-box label {
          color: #7dd3fc;
          letter-spacing: 1px;
        }

        .submit-btn {
          background: linear-gradient(90deg, #22d3ee, #38bdf8);
          border: none;
          color: #020617;
          font-weight: 700;
          letter-spacing: 1px;
        }
      `}</style>

      <div className="page-root">
        <div className="top-bar">
          UI Design using bootstrap
        </div>

        <div className="center-wrap">
          <div className="glass-box">
            <h4 className="mb-4 fw-bold">Contact Form</h4>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <label className="form-label small fw-bold">EMAIL</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your CU email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">OBSERVATION</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Describe the component behavior..."
                ></textarea>
              </div>

              <button type="submit" className="btn submit-btn w-100 py-2">
                Submit to Lab
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
