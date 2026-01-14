import { useState, useContext } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post('/auth/login', {
        email,
        password
      });

      login(data);
      navigate('/');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" marginTop={5}>
        Login
      </Typography>

      <form onSubmit={submitHandler}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
