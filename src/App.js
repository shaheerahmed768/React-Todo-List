import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTaskList(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const addTask = () => {
    setTaskList([...taskList, taskInput]);
    setTaskInput('');
  };

  const deleteTask = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
  };

  const editTask = (index, newTask) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index] = newTask;
    setTaskList(updatedTaskList);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {taskList.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
            <button onClick={() => editTask(index, prompt('Enter new task name:'))}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;