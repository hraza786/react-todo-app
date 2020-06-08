

import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField"
import DeleteRounded from "@material-ui/icons/DeleteRounded"
import Checkbox from "@material-ui/core/Checkbox"
import ParticlesBg from "particles-bg"
const App = () => {
  //the main app which will mange the state and sent it as props to other comps
  //setting up state

  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState("Write to-do here...");
  

  const handleChange = (event) => {
    setInput(event.target.value);
    console.log(input);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input !== "") {
      setTodos((todos) => [...todos, input]);
      setInput("");
    } else alert("input something!");
  };

  const handleDelete = (event) => {
    var index = event.target.getAttribute("index");
    const newTodos = todos.filter((todo, i) => i != index);
    setTodos(newTodos);
    console.log(newTodos);
  };

  const handleInputClick = (event) => {
    event.target.value = "";
  };

  return (
    <div className="App">
      <div className="appStyleInner">
        <h1>The Amazing Todo App</h1>
        <Input
          handleChange={handleChange}
          handleInputClick={handleInputClick}
          handleSubmit={handleSubmit}
          value={input}
        />
        <List todos={todos} handleDelete={handleDelete} />
      </div>
      <ParticlesBg type="cobweb" bg={true} />
    </div>
    
  );
};

const Input = ({ value, handleInputClick, handleChange, handleSubmit }) => {
  //the form which will supply us data
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          value={value}
          onChange={handleChange}
          onClick={handleInputClick}
        />
        <Button variant="contained" color="white" type="submit" id="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

const List = ({ todos, handleDelete }) => {
  //it will map over the state array and render Todo components fo reach
  return todos.map((todo, index) => {
    return <Todo todo={todo} index={index} handleDelete={handleDelete} />;
  });
};

const Todo = ({ todo, index, handleDelete }) => {

  const [striked, setStrike] = React.useState(false);

  const handleCheck = () => {
    setStrike(!striked);
  }

  //a single todo. Only styling and presentation
  return (
    <li className={`todoStyle ${striked ? "Striked" : ""}`} key={index}>
      <Checkbox type="checkbox" onClick={handleCheck}/>
      {todo}{" "}
      <DeleteRounded index={index} onClick={handleDelete} id="button">
        X
      </DeleteRounded>
    </li>
  );
};

export default App;
