import { Provider, useDispatch, useSelector } from "react-redux";
import store, { addItem, removeItem } from "./store";
import "./App.css";

import laptopImg from "./assets/laptop.png";
import phoneImg from "./assets/phone.png";
import headphonesImg from "./assets/headphones.png";

const products = [
  { name: "Laptop", image: laptopImg },
  { name: "Phone", image: phoneImg },
  { name: "Headphones", image: headphonesImg },
];

function Header() {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="header">
      <h1>Shopping Cart</h1>
      <span className="badge">Items: {cart.length}</span>
    </div>
  );
}

function Products() {
  const dispatch = useDispatch();

  return (
    <div className="products">
      {products.map((p) => (
        <div key={p.name} className="product-card">
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <button onClick={() => dispatch(addItem(p.name))}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <p className="empty">Cart is empty</p>;
  }

  return (
    <div className="cart-list">
      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <span>{item}</span>
          <button
            className="remove"
            onClick={() => dispatch(removeItem(index))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

function AppContent() {
  return (
    <div className="page">
      <div className="card">
        <Header />
        <div className="content">
          <section>
            <h2>Products</h2>
            <Products />
          </section>

          <section>
            <h2>Cart</h2>
            <Cart />
          </section>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
