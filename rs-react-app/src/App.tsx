import { Component } from 'react';
import './App.css';

interface IState {
  hasError: boolean;
}

class App extends Component {
  state: IState = {
    hasError: false,
  };

  throwError = () => {
    this.setState(({ hasError }: IState) => ({
      hasError: !hasError,
    }));
  };

  render() {
    if (this.state.hasError) {
      throw Error('Error!');
    }

    return (
      <>
        <button onClick={this.throwError}>Throw error</button>
      </>
    );
  }
}

export default App;
