import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import './Pagination.css';

interface IProps {
  firstPage: boolean;
  lastPage: boolean;
}

export function Pagination({ firstPage, lastPage }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 0;

  const handlePrev = useCallback(() => {
    if (!firstPage) {
      const newPage = currentPage - 1;
      searchParams.set('page', newPage.toString());
      setSearchParams(searchParams);
    }
  }, [currentPage, firstPage, searchParams, setSearchParams]);

  const handleNext = useCallback(() => {
    if (!lastPage) {
      const newPage = currentPage + 1;
      searchParams.set('page', newPage.toString());
      setSearchParams(searchParams);
    }
  }, [currentPage, lastPage, searchParams, setSearchParams]);

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={firstPage}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 6L9 12L15 18"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="pagination_current-page">{currentPage + 1}</div>

      <button onClick={handleNext} disabled={lastPage}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
