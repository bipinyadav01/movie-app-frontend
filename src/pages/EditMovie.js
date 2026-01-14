import { useEffect, useState, useContext } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);

  const [movie, setMovie] = useState({});

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await API.get(`/movies`);
      const found = data.movies.find(m => m._id === id);
      setMovie(found);
    };
    fetchMovie();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await API.put(`/movies/${id}`, movie, config);
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={submitHandler}>
        <TextField fullWidth label="Title" value={movie.title || ''} onChange={e => setMovie({ ...movie, title: e.target.value })} />
        <TextField fullWidth label="Description" value={movie.description || ''} onChange={e => setMovie({ ...movie, description: e.target.value })} />
        <TextField fullWidth label="Rating" value={movie.rating || ''} onChange={e => setMovie({ ...movie, rating: e.target.value })} />
        <TextField fullWidth type="date" value={movie.releaseDate?.substring(0,10) || ''} onChange={e => setMovie({ ...movie, releaseDate: e.target.value })} />
        <TextField fullWidth label="Duration" value={movie.duration || ''} onChange={e => setMovie({ ...movie, duration: e.target.value })} />
        <Button type="submit" variant="contained">Update Movie</Button>
      </form>
    </Container>
  );
};

export default EditMovie;
