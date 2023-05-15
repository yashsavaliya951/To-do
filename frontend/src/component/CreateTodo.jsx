import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "../App.css";
function CreateTodo() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    todo_description: "",
    todo_responsible: "",
    todo_priority: "",
    todo_completed: false,
  });
  const onChangeHadler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { todo_description, todo_responsible } = state;
    if (
      todo_description == "" ||
      todo_responsible == "" 
    
    ) {
      alert("Please enter a all field");
    } else {
      const res = await axios.post("http://localhost:4000/todos/add", state);
      if (res) {
        setState({
          todo_description: "",
          todo_responsible: "",
          todo_priority: "",
          todo_completed: false,
        });
        toast.success("Successfully Create todo");
        navigate("/");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="form-div">
      {" "}
      <div style={{ marginTop: 20 }}>
        <h3>Create New List</h3>

        <form onSubmit={onSubmit} className="todo-form">
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              name="todo_description"
              value={state.todo_description}
              onChange={(e) => onChangeHadler(e)}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              name="todo_responsible"
              value={state.todo_responsible}
              onChange={(e) => onChangeHadler(e)}
            />
          </div>
          
          <div className="form-group">
            <input
              type="submit"
              value="Create Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTodo;
