import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'ac6228c5d4d762562ef059715b37d565';

const fetchHomePage = async page => {
  const url = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${page}`;
  const { data } = await axios.get(url);
  return data;
};

const fetchSearch = async (query, page) => {
  const searchParams = new URLSearchParams({
    query: query,
    page: page,
    include_adult: false,
    language: 'en-US',
  });
  const url = `${BASE_URL}search/movie?api_key=${API_KEY}&${searchParams}`;
  const { data } = await axios.get(url);
  return data;
};

const fetchMovieDetails = async movieId => {
  const url = `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  const { data } = await axios.get(url);
  return data;
};

const fetchMovieCredits = async movieId => {
  const url = `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
  const { data } = await axios.get(url);
  return data;
};

const fetchMovieReviews = async movieId => {
  const url = `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`;
  const { data } = await axios.get(url);
  return data;
};

const api = {
  fetchHomePage,
  fetchSearch,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
};

export default api;
