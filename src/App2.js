import React from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const appStyleWrapper = {
    backgroundColor: "lightBlue",
    textAlign: "center",
    height: "50%",
    width: "40%",
    margin: "auto",
    marginTop: "10%",
    border: "1px black solid",
  };

  const appStyleInner = {
    display: "inline-block",
  };

  //setup state
  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState("Your input here.");

  const handleChange = (event) => {
    setInput(event.target.value);
    console.log(input);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setTodos((todos) => [...todos, input]);
    setInput("");
  };

  const handleDelete = (event) => {
    console.log("target is: " + event.target.getAttribute("index"));
    var index = event.target.getAttribute("index");
    const newTodos = todos.filter((todo, i) => i != index);
    setTodos(newTodos);
    console.log(newTodos);
  };

  const handleInputClick = (event) => {
    event.target.value = "";
  };

  return (
    <div style={appStyleWrapper}>
      <div style={appStyleInner}>
        <h1>My Todo App</h1>
        <form onSubmit={handleSubmit}>
          <label>Todo: </label>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            onClick={handleInputClick}
          ></input>
          <input type="submit"></input>
        </form>
        {todos.map((todo, index) => {
          return (
            <p key={index}>
              {todo}{" "}
              <button index={index} onClick={handleDelete}>
                X
              </button>
            </p>
          );
        })}
      </div>
    </div>
  );
};
export default App;