import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FlashMessage from "react-flash-message";

const Message = ({ submitted, removed }) => {
  if (submitted) {
    return (
      <FlashMessage duration={1830}>
        <p className='submitted'>
          <strong> Todo Inserted </strong>
        </p>
      </FlashMessage>
    );
  } else if (removed) {
    return (
      <FlashMessage duration={1830}>
        <p className="deleted">
          <strong> Todo Removed </strong>
        </p>
      </FlashMessage>
    );
  } else return null;
};

const App = () => {
  //the main app which will mange the state and sent it as props to other comps
  //setting up state

  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState("Write to-do here...");
  const [submitted, setSubmitted] = React.useState(false);
  const [removed, setRemoved] = React.useState(false);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input !== "") {
      setTodos((todos) => [...todos, input]);
      setInput("");
      setSubmitted(true);
    } else alert("input something!");
    setTimeout(() => {
      setSubmitted(false);
    }, 1830)
  };

  const handleDelete = (event) => {
    var index = event.target.getAttribute("index");
    const newTodos = todos.filter((todo, i) => i != index);
    setTodos(newTodos);
    setRemoved(true);
    setTimeout(()=> {
      setRemoved(false)
    }, 1830)
  };

  const handleInputClick = (event) => {
    event.target.value = "";
  };

  return (
    <div className="App">
      <Message submitted={submitted} removed={removed} />
      <div className="appStyleInner">
        <h1 className="linear-wipe">The Amazing Todo App</h1>
        <Input
          handleChange={handleChange}
          handleInputClick={handleInputClick}
          handleSubmit={handleSubmit}
          value={input}
        />
        <List todos={todos} handleDelete={handleDelete} />
      </div>
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
  };

  //a single todo. Only styling and presentation
  return (
    <li className={`todoStyle ${striked ? "Striked" : ""}`} key={index}>
      <Checkbox type="checkbox" onClick={handleCheck} />
      {todo}{" "}
      <button index={index} onClick={handleDelete} id="button">
        X
      </button>
    </li>
  );
};

export default App;
