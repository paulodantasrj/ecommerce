import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/Headers';
import Pages from './pages';

const App = () => {
  return (
    //Armazenar o GlobalState por toda a aplicação
    <DataProvider>
      {/*responsável por informar pra nossa aplicação que a partir de onde ele é chamado teremos um roteamento de componentes*/}
      <BrowserRouter>
      <Header />
        <div className="App">
          <Pages />
        </div>
        {/*footer*/}
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
