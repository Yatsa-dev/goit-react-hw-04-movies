import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchForm from 'components/SearchForm';
import Spinner from 'components/Spinner';
import api from 'components/Service-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!query) {
      return;
    }
    setTimeout(() => {
      setStatus(Status.RESOLVED);
      api.fetchSearch(query);
    }, 2000);
    setStatus(Status.PENDING);
  }, [query]);

  const handleFormSubmit = query => {
    setQuery(query);
  };
  return (
    <>
      <SearchForm onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={2000} />
      {status === Status.PENDING && <Spinner />}
    </>
  );
}
