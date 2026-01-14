import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';



const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Movie App
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Movies
        </Button>

        {userInfo && userInfo.user.role === 'admin' && (
          <Button color="inherit" component={Link} to="/admin">
            Admin
          </Button>
        )}

        {userInfo ? (
          <Button color="inherit" onClick={logoutHandler}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
