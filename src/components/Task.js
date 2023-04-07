import React, { useState, useEffect } from "react";
import axios from "axios";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [btn, setbtn] = useState("Add task");
  useEffect(() => {
    axios.get();
    axios
      .get("http://localhost:3000/tasks")
      .then((response) => {
        setTasks(response.data);
        setFilteredTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    const task = {
      name: taskName,
      dueDate: dueDate,
      status: status,
    };

    axios
      .post("http://localhost:3000/tasks", task)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setFilteredTasks([...filteredTasks, response.data]);
        setTaskName("");
        setDueDate("");
        setStatus("Pending");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:3000/tasks/${taskId}`)
      .then(() => {
        const newTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(newTasks);
        setFilteredTasks(newTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTask = (taskId, updatedTask) => {
    axios
      .put(`http://localhost:3000/tasks/${taskId}`, updatedTask)
      .then(() => {
        const newTasks = tasks.map((task) =>
          task.id === taskId ? updatedTask : task
        );
        setTasks(newTasks);
        setFilteredTasks(newTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterTasks = () => {
    let filtered = tasks.filter((task) =>
      task.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filterStatus) {
      filtered = filtered.filter((task) => task.status === filterStatus);
    }

    setFilteredTasks(filtered);
  };

  const edittask = (e, taskId, updatedTask) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/tasks/${taskId}`, updatedTask)
      .then(() => {
        const newTasks = tasks.map((task) =>
          task.id === taskId ? updatedTask : task
        );
        setTasks(newTasks);
        setFilteredTasks(newTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearFilters = () => {
    setFilteredTasks(tasks);
    setSearchText("");
    setFilterStatus("");
  };

  const clearform=()=>{
    setDueDate("")
    setStatus("")
    setTaskName("")
  }
  return (
    <div>
      <form onSubmit={(e) => addTask(e)}>
        <h1>Task Manager</h1>
        
        <div >

          <label>Task Name:</label>
          <br />
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            style={{width:"300px"}}
          />
        </div>

        <div>
          <label>Due Date:</label>
          <br />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{width:"300px"}}
          />
        </div>
        <div>
          <label>Status:</label>
          <br />
          <select style={{width:"300px"}} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <br />
          <button style={{width:"300px",marginTop:"10px", backgroundColor:"green",color:"white"}} type="submit">Add</button>
          
        </div>
      </form>
      <br />
      <div>
        
       
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          style={{width:"250px"}}
        />
        <button style={{backgroundColor:"green",color:"white"}} onClick={filterTasks}>Filter</button>
        <br />
        <button  style={{backgroundColor:"orange",color:"white"}} onClick={clearFilters}>Clear Filters</button>
      </div>
      <div style={{width:"100%",textAlign:"center"}}>
        <h2>All Tasks</h2>
        <div style={{display:"flex",justifyContent:"center"}}>
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Delete</th>
              <th>Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
                <td>
                  <button style={{backgroundColor:"red",color:"white"}} onClick={() => deleteTask(task.id)}>Delete</button>
                  </td>
                  <td>
                  <button
                  style={{width:"100%",backgroundColor:"blue",color:"white"}}
                    onClick={() =>
                      updateTask(task.id, {
                        ...task,
                        status:
                          task.status === "Pending" ? "Completed" : "Pending",
                      })
                    }
                  >
                    {task.status === "Pending"
                      ? "Mark as Completed"
                      : "Mark as Pending"}
                  </button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default Task;
