import React from 'react';
import Main from './components/Main';
import AppBar from "./components/AppBar";

function App() {
  return (
    <div className="App">
      <header>
        <AppBar />
      </header>
      <div className="app">
        <Main />
      </div>
    </div>
  );
}

export default App;