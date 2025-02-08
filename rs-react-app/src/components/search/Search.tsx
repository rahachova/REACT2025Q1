import { ChangeEvent, useState } from 'react';
import './Search.css';

interface IProps {
  onSearch: (search: string) => void;
}

export function Search({ onSearch }: IProps) {
  const [value, setValue] = useState<string>(
    localStorage.getItem('moviesSearchQuery') || ''
  );

  const handleSearch = () => {
    onSearch(value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="search">
      <input onChange={handleChange} value={value} type="text" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
