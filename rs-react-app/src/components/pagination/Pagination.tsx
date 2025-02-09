import { useCallback } from 'react';
import './Pagination.css';

interface IProps {
  currentPage: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  firstPage,
  lastPage,
  onPageChange,
}: IProps) {
  const handlePrev = useCallback(() => {
    if (!firstPage) onPageChange(currentPage - 1);
  }, [currentPage, firstPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (!lastPage) onPageChange(currentPage + 1);
  }, [currentPage, lastPage, onPageChange]);

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
