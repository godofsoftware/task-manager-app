// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    setIsFormOpen(false); // Close the form modal after task creation
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Task Management App
        </Typography>
        <Button variant="contained" color="primary" onClick={openForm}>
          Add Task
        </Button>
        <Dialog open={isFormOpen} onClose={closeForm}>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <TaskForm onTaskCreated={handleTaskCreated} />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeForm} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Box mt={2} mb={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Filter by status:</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Filter by status"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TaskList tasks={filteredTasks} onUpdate={handleTaskUpdated} onDelete={handleTaskDeleted} />
      </Box>
    </Container>
  );
};

export default Home;
