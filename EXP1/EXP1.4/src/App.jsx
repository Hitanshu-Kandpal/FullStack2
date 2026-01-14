import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInput("");
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const styles = {
    app: {
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
    },
    addItem: {
      width: "100vw",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: "10px",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },
    input: {
      flex: 1,
      maxWidth: "500px",
      padding: "6px",
      fontSize: "14px",
    },
    addButton: {
      padding: "6px 10px",
      cursor: "pointer",
    },
    list: {
      display: "flex",
      flexDirection: "column",
      fontSize: "12px",
      width: "100%",
      maxWidth: "600px",
      marginTop: "20px",
      padding: "0",
    },
    listItem: {
      listStyle: "none",
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      padding: "8px",
      borderBottom: "1px solid #ccc",
    },
    deleteButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1>Todo List</h1>
      </div>

      <div style={styles.addItem}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a todo"
          style={styles.input}
        />

        <button onClick={addTodo} style={styles.addButton}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo, index) => (
          <li key={index} style={styles.listItem}>
            {todo}
            <button
              onClick={() => deleteTodo(index)}
              style={styles.deleteButton}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;