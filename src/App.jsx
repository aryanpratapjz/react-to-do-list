// src/App.js
import React, { useEffect, useState } from 'react';
import { TextField, IconButton, List, ListItem, ListItemText, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [task, setTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask('');
  };

  const handleEditTask = (todoList) => {
    setTask(tasks[todoList].text);
    setEditingIndex(todoList);
  };

  const handleUpdateTask = () => {
    if (!task.trim() || editingIndex === null) return;
    const updatedTasks = tasks.map((singleTask, todoList) =>
      todoList === editingIndex ? { ...singleTask, text: task } : singleTask
    );
    setTasks(updatedTasks);
    setTask('');
    setEditingIndex(null);
  };

  const handleDeleteTask = (todoList) => {
    const updatedTasks = tasks.filter((_, todoListIndex) => todoListIndex !== todoList);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (todoList) => {
    const updatedTasks = tasks.map((singleTask, todoListIndex) =>
      todoListIndex === todoList ? { ...singleTask, completed: !singleTask.completed } : singleTask
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <TextField
          label="Add Task"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <IconButton onClick={editingIndex !== null ? handleUpdateTask : handleAddTask}>
          <AddIcon />
        </IconButton>
      </div>
      <List className="task-list">
        {tasks.map((singleTask, todoList) => (
          <ListItem key={todoList} dense>
            <Checkbox
              checked={singleTask.completed}
              onChange={() => handleToggleComplete(todoList)}
            />
            <ListItemText
              primary={singleTask.text}
              style={{ textDecoration: singleTask.completed ? 'line-through' : 'none' }}
            />
            <IconButton onClick={() => handleEditTask(todoList)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteTask(todoList)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;

