import { createContext, useContext, useState } from "react";
import "./App.css";

const CounterContext = createContext();

function Header() {
  const { count } = useContext(CounterContext);
  return (
    <div className="header">
      <h1>Context API Counter</h1>
      <div className="badge">Count: {count}</div>
    </div>
  );
}

function Counter() {
  const { count, increment, decrement } = useContext(CounterContext);

  return (
    <div className="counter-box">
      <div className="count-value">{count}</div>
      <div className="buttons">
        <button onClick={increment}>Increment</button>
        <button className="danger" onClick={decrement}>
          Decrement
        </button>
      </div>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider
      value={{
        count,
        increment: () => setCount(c => c + 1),
        decrement: () => setCount(c => (c > 0 ? c - 1 : 0)),
      }}
    >
      <div className="page">
        <div className="card">
          <Header />
          <Counter />
        </div>
      </div>
    </CounterContext.Provider>
  );
}

export default App;
