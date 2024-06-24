// TaskItem.js
import React from 'react';
import { Card, CardContent, Typography, Select, MenuItem, Button, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Adding a stronger shadow
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)', // Adding a hover effect for a better visual appearance
  },
}));

const Description = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const handleStatusChange = async (e) => {
    const updatedTask = { ...task, status: e.target.value };
    try {
      await axios.put(`/api/tasks/${task.id}`, updatedTask);
      onUpdate(updatedTask);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
      onDelete(task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="h2">
          {task.title}
        </Typography>
        <Tooltip title={task.description}>
          <Description variant="body2" color="textSecondary">
            {task.description}
          </Description>
        </Tooltip>
        <Select
          sx={{ mt: 3 }}
          value={task.status}
          onChange={handleStatusChange}
          fullWidth
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </CardContent>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDelete}
      >
        DELETE
      </Button>
    </StyledCard>
  );
};

export default TaskItem;
