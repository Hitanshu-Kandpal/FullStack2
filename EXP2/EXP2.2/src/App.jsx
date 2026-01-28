import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const cardData = [
    { title: "Card One", description: "This is the first card using Bootstrap." },
    { title: "Card Two", description: "This is the second card using Bootstrap." },
    { title: "Card Three", description: "This is the third card using Bootstrap." },
    { title: "Card Four", description: "This is the fourth card using Bootstrap." }
  ];

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
          background: linear-gradient(135deg, #020617, #0f172a);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .custom-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 18px;
          color: white;
          transition: 0.3s;
        }

        .custom-card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }
      `}</style>

      <div className="page-root">
        <div className="container">
          <h2 className="text-center mb-5">Card-Based Layout Using Bootstrap</h2>

          <div className="row g-4">
            {cardData.map((card, index) => (
              <div className="col-md-3 col-sm-6" key={index}>
                <div className="card custom-card h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.description}</p>
                    <button className="btn btn-outline-info">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
