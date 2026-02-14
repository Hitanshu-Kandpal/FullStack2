import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import "./App.css";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; },
    decrement: state => { state.value -= 1; },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <p className="value">{count}</p>
      <div className="controls">
        <button onClick={() => dispatch(counterSlice.actions.increment())}>
          Increment
        </button>
        <button
          className="remove"
          onClick={() => dispatch(counterSlice.actions.decrement())}
        >
          Decrement
        </button>
      </div>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="page">
        <div className="card">
          <div className="header">
            <h1>Redux Counter</h1>
            <span className="badge">Global Store</span>
          </div>

          <div className="content single">
            <h2>Centralized State Management</h2>
            <Counter />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
