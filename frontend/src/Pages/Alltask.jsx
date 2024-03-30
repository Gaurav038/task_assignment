import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Alltask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterPriority, setFilterPriority] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    setLoading(true);
    console.log("Filter Priority:", filterPriority);
    console.log("Filter Category:", filterCategory);
    axios
      .get(
        `http://localhost:8000/tasks/allTask/?priority=${filterPriority}&category=${filterCategory}`
      )
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error on fetching tasks. Please try again later.");
        setLoading(false);
      });
  }, [filterPriority, filterCategory]);

  const handleDelete = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:8000/tasks/delete/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error on deleting task:", error);
      setError("Error on deleting task. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container m-8">
      <h1 className="text-3xl font-bold mb-4">Task management</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex mb-4">
        <div className="mr-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="priorityFilter"
          >
            Filter by Priority:
          </label>
          <select
            id="priorityFilter"
            className="appearance-none border rounded px-4 py-2"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">All</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryFilter"
          >
            Filter by Category:
          </label>
          <select
            id="categoryFilter"
            className="appearance-none border rounded px-4 py-2"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="work">work</option>
            <option value="personal">personal</option>
            <option value="study">study</option>
          </select>
        </div>
      </div>

      <table className="table-auto w-full mb-8">
        <thead>
          <tr>
            <th className="px-4 py-2">Task</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="border px-4 py-2">{task.title}</td>
              <td className="border px-4 py-2">{task.description}</td>
              <td className="border px-4 py-2">{task.priority}</td>
              <td className="border px-4 py-2">{task.category}</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/update-task/${task._id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        to="/add"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Task
      </Link>
    </div>
  );
};

export default Alltask;
