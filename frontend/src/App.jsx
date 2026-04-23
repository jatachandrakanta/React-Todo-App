import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [dark, setDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [search, setSearch] = useState("");

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/todos",
        getAuthHeader()
      );
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchTodos();
  }, [isLoggedIn]);

  // ADD / UPDATE
  const addTodo = async () => {
    if (!title) return;

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/todos/${editId}`,
          { title, dueDate },
          getAuthHeader()
        );
        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/todos",
          { title, dueDate },
          getAuthHeader()
        );
      }

      setTitle("");
      setDueDate("");
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/todos/${id}`,
      getAuthHeader()
    );
    fetchTodos();
  };

  const toggleTodo = async (id, completed) => {
    await axios.put(
      `http://localhost:5000/api/todos/${id}`,
      { completed: !completed },
      getAuthHeader()
    );
    fetchTodos();
  };

  const editTodo = (todo) => {
    setTitle(todo.title);
    setDueDate(todo.dueDate ? todo.dueDate.slice(0, 16) : "");
    setEditId(todo._id);
  };

const filteredTodos = todos.filter((todo) => {
  const matchesSearch = todo.title
    .toLowerCase()
    .includes(search.toLowerCase());

  if (filter === "completed")
    return todo.completed && matchesSearch;

  if (filter === "pending")
    return !todo.completed && matchesSearch;

  return matchesSearch;
});
  const toggleDark = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setTodos([]);
  };

  if (!isLoggedIn) {
    return isLogin
      ? <Login setIsLoggedIn={setIsLoggedIn} setIsLogin={setIsLogin} />
      : <Register setIsLogin={setIsLogin} />;
  }

  return (
    <div className="container">
      <h1>Todo App 🚀</h1>

      <button className="darkBtn" onClick={toggleDark}>
        {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      <button onClick={logout}>Logout</button>

      {/* INPUT */}
      <div className="inputBox">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo..."
        />

        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={addTodo}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* FILTER */}
      <div className="filterBox">
        <input
  type="text"
  placeholder="Search todo..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {/* TODOS */}
      {filteredTodos.length === 0 ? (
        <p className="empty">No todos yet...</p>
      ) : (
        filteredTodos.map((todo) => {
          const isExpired =
            todo.dueDate &&
            new Date(todo.dueDate) < new Date() &&
            !todo.completed;

          return (
            <div
              className={`todo ${isExpired ? "expired" : ""}`}
              key={todo._id}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo._id, todo.completed)}
              />

              <div>
                <span className={todo.completed ? "completed" : ""}>
                  {todo.title}
                </span>

                {todo.dueDate && (
                  <p className="date">
                    ⏰ {new Date(todo.dueDate).toLocaleString()}
                  </p>
                )}

                {isExpired && (
                  <p className="expiredText">⚠️ Overdue</p>
                )}
              </div>

              <div className="actions">
                <button onClick={() => editTodo(todo)}>✏️</button>
                <button onClick={() => deleteTodo(todo._id)}>❌</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;