import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Loading from "./components/Loading";
import lazyWithDelay from "./utils/lazyWithDelay";

const Dash = lazyWithDelay(() => import("./components/dashboard"), { ms: 1000, fallback: <Loading /> });
const Prof = lazyWithDelay(
  () => import("./components/dashboard").then((m) => ({ default: m.Profile })),
  { ms: 1000, fallback: <Loading /> }
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dash />} />
        <Route path="/profile" element={<Prof />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
