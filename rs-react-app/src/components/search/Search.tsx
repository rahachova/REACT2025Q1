import { ChangeEvent, Component } from 'react';
import './Search.css';

interface IProps {
  onSearch: (search: string) => void;
}

interface IState {
  value: string;
}

export class Search extends Component<IProps, IState> {
  state: IState = {
    value: localStorage.getItem('moviesSearchQuery') || '',
  };

  handleSearch = () => {
    this.props.onSearch(this.state.value);
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    return (
      <div className="search">
        <input
          onChange={this.handleChange}
          value={this.state.value}
          type="text"
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}
