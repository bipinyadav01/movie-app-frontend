import { useState, useContext } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid
} from '@mui/material';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Admin = () => {
  const { userInfo } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [duration, setDuration] = useState('');

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  };

  // Add Movie
  const addMovieHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        '/movies',
        { title, description, rating, releaseDate, duration },
        config
      );

      alert('Movie added successfully');

      setTitle('');
      setDescription('');
      setRating('');
      setReleaseDate('');
      setDuration('');
    } catch (error) {
      alert('Error adding movie');
    }
  };

  // Insert IMDb Movies
  const insertImdbHandler = async () => {
    try {
      await API.post('/movies/imdb', {}, config);
      alert('IMDb movies are being inserted in background');
    } catch (error) {
      alert('Error inserting IMDb movies');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" marginY={3}>
        Admin Panel
      </Typography>

      {/* Add Movie Form */}
      <form onSubmit={addMovieHandler}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Rating"
          type="number"
          fullWidth
          margin="normal"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <TextField
          label="Release Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />

        <TextField
          label="Duration (mins)"
          type="number"
          fullWidth
          margin="normal"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Add Movie
        </Button>
      </form>

      {/* IMDb Insert */}
      <Grid marginTop={4}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={insertImdbHandler}
        >
          Insert IMDb Top Movies
        </Button>
      </Grid>
    </Container>
  );
};

export default Admin;
