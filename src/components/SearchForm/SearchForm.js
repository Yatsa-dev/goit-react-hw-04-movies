import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import SearchTwoTone from '@material-ui/icons/SearchTwoTone';
import IconButton from '@material-ui/core/IconButton';
import s from './SearchForm.module.css';

const useStyles = makeStyles(theme => ({
  toTop: {
    zIndex: 2,
    top: 5,
    bottom: '2vh',
    backgroundColor: '#fff',
    color: '#212121',
    borderRadius: 4,
    '&:hover, &.Mui-focusVisible': {
      transition: '0.3s',
      color: '#fff',
      backgroundColor: '#2a363b',
      boxShadow: '3px 5px 5px rgba(3, 5, 5, 0.12)',
    },
    [theme.breakpoints.up('xs')]: {
      right: '0%',
      backgroundColor: '#8c9092',
    },
  },
}));

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');
  const classes = useStyles();

  const handleQueryChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.dark('Sorry,input field is empty');
      return;
    }
    onSubmit(query);
    setQuery('');
  };
  return (
    <form onSubmit={handleSubmit} className={s.SearchForm}>
      <IconButton
        onClick={handleSubmit}
        className={classes.toTop}
        aria-label="to top"
        component="span"
      >
        <SearchTwoTone fontSize="large" />
      </IconButton>
      <input
        className={s.input}
        value={query}
        onChange={handleQueryChange}
        type="text"
        placeholder="Start by searching by movie title "
      />
    </form>
  );
}
SearchForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.string,
};
