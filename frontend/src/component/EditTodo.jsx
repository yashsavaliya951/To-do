import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditTodo() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [state, setState] = useState({
    todo_description: "",
    todo_responsible: "",
    todo_priority: "",
    todo_completed: false,
  });
  const getTodoList = async () => {
    const res = await axios.get("http://localhost:4000/todos/" + id);
    if (res) {
      setState({
        todo_description: res.data.todo_description,
        todo_responsible: res.data.todo_responsible,
        todo_priority: res.data.todo_priority,
        todo_completed: res.data.todo_completed,
      });
    } else console.log("something went wrong!");
  };
  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  console.log(state);
  const onSubmit = async (e) => {
    e.preventDefault();
    const { todo_description, todo_responsible } = state;
    if (
      todo_description == "" ||
      todo_responsible == "" 
    ) {
      alert("Please enter a all field");
    } else {
      console.log(state);
      const res = await axios.put(
        "http://localhost:4000/todos/update/" + id,
        state
      );
      if (res) {
        setState({
          todo_description: "",
          todo_responsible: "",
          todo_priority: "",
          todo_completed: false,
        });
        navigate("/");
      } else {
        console.log("something went wrong");
      }
    }
  };
  useEffect(() => {
    getTodoList();
  }, [id]);
  return (
    <div className="form-div">
      <h3>Update Todo</h3>
      <form onSubmit={onSubmit} className="todo-form">
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            className="form-control"
            name="todo_description"
            value={state.todo_description}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
        </div>
        <div className="form-group">
          <label>Responsible: </label>
          <input
            type="text"
            className="form-control"
            name="todo_responsible"
            value={state.todo_responsible}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Update Todo"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditTodo;
