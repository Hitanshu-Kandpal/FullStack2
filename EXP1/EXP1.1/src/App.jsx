import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.countText}>{count}</h1>

        <div style={styles.buttonGroup}>
          <button
            style={styles.button}
            onClick={() => setCount(count - 1)}
          >
            Decrease
          </button>

          <button
            style={styles.button}
            onClick={() => setCount(count + 1)}
          >
            Increase
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
  },
  countText: {
    fontSize: "64px",
    marginBottom: "20px",
    color: "#000",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#000",
    color: "white",
  },
};

export default App;
