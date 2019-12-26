import React from 'react';
import Navigation from './components/Navigation';
import Main from './components/Main';

class App extends React.Component {

  constructor() {
    super();
    this.state = { }
  }
  //va a correr la primera vez, aunque se renderee muchas veces, solo se corre la primera.
  componentDidMount() {

  }

  render() {
    
    return (
      <div className="app">
        <Navigation />
        <Main />
      </div>
    );
  }
}
export default App;
