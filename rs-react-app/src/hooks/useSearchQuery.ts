import { useEffect, useState } from 'react';

export function useSearchQuery(): [string, (searchQuery: string) => void] {
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem('moviesSearchQuery') || ''
  );

  useEffect(() => {
    localStorage.setItem('moviesSearchQuery', searchQuery);
  }, [searchQuery]);

  return [searchQuery, setSearchQuery];
}
