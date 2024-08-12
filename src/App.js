import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Header from './header/Header';
import Trailer from './trailer/Trailer';
import Reviews from './reviews/Reviews';
import NotFound from './notFound/NotFound';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () =>{
    
    try
    {

      const response = await api.get("/api/v1/movies");

      setMovies(response.data);

    } 
    catch(err)
    {
      console.log(err);
    }
  }
  console.log(movies)

  const getMovieData = async (movieId) => {
     
    try 
    {
        const response = await api.get(`/api/v1/movies/${movieId}`);
        console.log(response)

        const singleMovie = response.data;

        setMovie(singleMovie);

        setReviews(singleMovie.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }
  console.log(movie)

  useEffect(() => {
    getMovies();
  },[])

  return (
    <div className="App">
      <Header/>
      
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home movies={movies} />} ></Route>
            <Route path="Trailer/:ytTrailerId" element={<Trailer/>}></Route>
            <Route path="Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
            
          </Route>
      </Routes>

    </div>
  );
}

export default App;
