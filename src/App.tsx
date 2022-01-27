import React from 'react';
import { Container, Paper } from '@mui/material';
import ToDoList from './ToDoList';

const App: React.FC = () => {
  return (
    <Container maxWidth="xs" sx={{ my: 4 }}>
      <Paper>
        <ToDoList />
      </Paper>
    </Container>
  );
};

export default App;
