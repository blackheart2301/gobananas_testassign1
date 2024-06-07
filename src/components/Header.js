// src/components/Header.js
import { React, useRef } from 'react';
import { AppBar, Toolbar, Typography, InputBase, alpha } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.spacing(40),
  cursor: 'pointer',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    '::placeholder': {
      color: 'inherit',
      opacity: 1,
    },
  },
}));

export default function Header({ onSearch }) {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div style={{paddingTop:'10px'}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            GoBananas
          </Typography>
          <Search>
            <SearchIconWrapper onClick={handleIconClick}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => onSearch(e.target.value)}
              inputRef={inputRef}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </div>
  );
}
