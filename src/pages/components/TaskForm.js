import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  styled,
} from '@mui/material';

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
  margin: 'auto',
  padding: '60px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
});

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    const newTask = { title, description, status };
    try {
      const response = await axios.post('/api/tasks', newTask);
      onTaskCreated(response.data);
      setTitle('');
      setDescription('');
      setStatus('To Do');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        margin="normal"
        required
        fullWidth
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
      />
      <FormControl variant="outlined" margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </StyledForm>
  );
};

export default TaskForm;
