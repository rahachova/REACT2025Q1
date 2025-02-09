import './Spinner.css';

export function Spinner() {
  return (
    <div className="spinner-container" data-testid="spinner">
      <div className="spinner"></div>
    </div>
  );
}
