import { ChangeEvent, useEffect, useState } from 'react';
import './Search.css';
import { useSearchParams } from 'react-router';
import { useSearchQuery } from '../../hooks/useSearchQuery';

export function Search() {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedSearchQuery, setSavedSearchQuery] = useSearchQuery();

  useEffect(() => {
    const searchQuery = searchParams.get('query') || savedSearchQuery;
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, []);

  const handleSearch = () => {
    searchParams.set('query', query);
    setSearchParams(searchParams);
    setSavedSearchQuery(query);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="search">
      <input onChange={handleChange} value={query} type="text" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
