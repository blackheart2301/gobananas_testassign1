// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const RootContainer = styled(Container)({
  flexGrow: 1,
  marginTop: '20px',
});

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[15],
    opacity: '0.9',
    backgroundColor: '#5f5',
  },
}));

const PaginationContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
});

const PaginationButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  color: '#fff',
  backgroundColor: '#3f51b5',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
}));

const UserList = ({ searchQuery }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]); // Fetch users whenever currentPage changes

  const fetchUsers = () => {
    axios.get(`https://randomuser.me/api/?results=12&page=${currentPage}`)
      .then(response => {
        setUsers(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <RootContainer>
      <Grid container spacing={3}>
        {users.filter(user => 
          user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.name.last.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.login.uuid}>
            <StyledCard>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  User ID: {user.login.uuid}
                </Typography>
                <Typography variant="h5" component="h2">
                  {user.name.first} {user.name.last}
                </Typography>
                <Typography color="textSecondary">
                  {user.email}
                </Typography>
                <Typography variant="body2" component="p">
                  {user.location.city}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <PaginationContainer>
        <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </PaginationButton>
        <PaginationButton onClick={handleNextPage}>
          Next
        </PaginationButton>
      </PaginationContainer>
    </RootContainer>
  );
}

export default UserList;
