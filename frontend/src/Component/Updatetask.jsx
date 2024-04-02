import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { serverAPI } from "../api";

const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("study");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { taskId } = useParams();
  console.log(taskId, "-----");

  const fetchTaskById = async () => {
    try {
      const response = await axios.get(
        `${serverAPI}/tasks/task/${taskId}`
      );
      if (response.data.statusCode === 200) {
        setTitle(response?.data?.data[0]?.title);
        setDescription(response?.data?.data[0]?.description);
        setPriority(response?.data?.data[0]?.priority);
        setCategory(response?.data?.data[0]?.category);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.patch(
        `${serverAPI}/tasks/edit/${taskId}`,
        {
          title,
          description,
          priority,
          category,
        }
      );
      console.log(response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Error updating task. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskById();
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
        >
          Back
        </Link>
      </div>

      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Update Task</h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Task Name
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Task Name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Description"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option>low</option>
            <option>medium</option>
            <option>high</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option>Choose Category</option>
            <option>personal</option>
            <option>work</option>
            <option>study</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {loading ? "Updating Task..." : "Update Task"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && (
          <p className="text-green-500 mt-2">Task updated successfully!</p>
        )}
      </div>
    </div>
  );
};

export default UpdateTask;
