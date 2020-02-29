import React from 'react';
import Main from './components/Main';
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <div className="app">
        <Main />
      </div>
    </div>
  );
}

export default App;