// src/App.js
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import UserList from './components/UserList';

const theme = createTheme();

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header onSearch={handleSearch} />
        <UserList searchQuery={searchQuery} />
      </div>
    </ThemeProvider>
  );
}

export default App;
