import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/Headers';
import Pages from './pages';

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Pages />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
