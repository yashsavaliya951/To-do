import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
function TodosList() {
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();

  const getTodoList = async () => {
    const res = await axios.get("http://localhost:4000/todos");
    if (res) setTodoList(res.data);
    else console.log("something went wrong!");
  };

  const DeleteTodo = async (id) => {
    const res = await axios.delete("http://localhost:4000/todos/delete/" + id);

    if (res) {
      getTodoList();
      //console.log("Delete successfully");
    } else console.log("something went wrong!");
  };
  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div className="todo-list">
      <div className="row">
        <h3>Todos List</h3>
        <button
          type="button"
          className="btn btn-warning  ml-4"
          onClick={() => navigate("/create")}
        >
          Add Todo
        </button>
      </div>

      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th className="tdname">Description</th>
            <th className="tdname">Responsible</th>
            <th className="tdname">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todoList.length > 0 ? (
            todoList.map((list, index) => {
              return (
                <tr key={index}>
                  <td className={list.todo_completed ? "completed" : "details"}>
                    {list.todo_description}
                  </td>
                  <td className={list.todo_completed ? "completed" : "details"}>
                    {list.todo_responsible}
                  </td>
                  <td>
                    <Link
                      className="btn btn-sm btn-success text-decoration-none"
                      to={"/edit/" + list._id}
                      style={{ padding:"8px 15px" }}
                    >
                      Edit
                    </Link>{" "}
                    <Link
                      className="btn btn-sm btn-danger text-decoration-none"
                      style={{ marginLeft: "20px", padding:"8px 15px" }}
                      onClick={() => DeleteTodo(list._id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <h1>Data Not Found</h1>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TodosList;
