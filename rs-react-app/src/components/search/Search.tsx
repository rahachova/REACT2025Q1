import { ChangeEvent, useEffect } from 'react';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import './Search.css';

interface IProps {
  onSearch: (search: string) => void;
}

export function Search({ onSearch }: IProps) {
  const [query, setQuery] = useSearchQuery();

  useEffect(() => {
    onSearch(query);
  }, [onSearch]);

  const handleSearch = () => {
    onSearch(query);
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
