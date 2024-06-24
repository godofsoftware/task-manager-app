// TaskList.js
import React from 'react';
import TaskItem from './TaskItem';
import { Grid, styled } from '@mui/material';

const StyledGrid = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
});

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  return (
    <StyledGrid container spacing={3}>
      {tasks.map((task) => (
        <Grid item key={task.id} xs={12} sm={6} md={4}>
          <TaskItem task={task} onUpdate={onUpdate} onDelete={onDelete} />
        </Grid>
      ))}
    </StyledGrid>
  );
};

export default TaskList;
