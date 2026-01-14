import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid,
  Button
} from '@mui/material';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch movies (pagination)
  const fetchMovies = async (pageNumber = 1) => {
    const { data } = await API.get(`/movies?page=${pageNumber}&limit=5`);
    setMovies(data.movies);
    setTotalPages(data.totalPages);
  };

  // Search movies
  const searchMovies = async () => {
    if (!search) {
      fetchMovies(page);
      return;
    }

    const { data } = await API.get(`/movies/search?query=${search}`);
    setMovies(data);
  };

  // Sort movies
  const sortMovies = async (value) => {
    setSortBy(value);
    const { data } = await API.get(
      `/movies/sorted?sortBy=${value}&order=asc`
    );
    setMovies(data);
  };

  // Delete movie (Admin)
  const deleteMovieHandler = async (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;

    try {
      await API.delete(`/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });

      fetchMovies(page); // refresh list
    } catch (error) {
      alert('Delete failed');
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <Container>
      <Typography variant="h4" marginY={3}>
        Movies
      </Typography>

      {/* Search & Sort */}
      <Grid container spacing={2} marginBottom={3}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained" fullWidth onClick={searchMovies}>
            Search
          </Button>
        </Grid>

        <Grid item xs={2}>
          <Select
            fullWidth
            value={sortBy}
            onChange={(e) => sortMovies(e.target.value)}
          >
            <MenuItem value="title">Name</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="releaseDate">Release Date</MenuItem>
            <MenuItem value="duration">Duration</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Movie List */}
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} md={6} key={movie._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography>{movie.description}</Typography>
                <Typography>Rating: {movie.rating}</Typography>
                <Typography>
                  Duration: {movie.duration} mins
                </Typography>

                {/* ADMIN ACTIONS */}
                {userInfo?.user?.role === 'admin' && (
                  <div style={{ marginTop: '10px' }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        navigate(`/admin/edit/${movie._id}`)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      sx={{ marginLeft: 1 }}
                      onClick={() => deleteMovieHandler(movie._id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Grid container justifyContent="center" marginY={3}>
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <Typography marginX={2}>
          Page {page} of {totalPages}
        </Typography>

        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Grid>
    </Container>
  );
};

export default Movies;

