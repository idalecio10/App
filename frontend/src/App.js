import React from 'react';

import './global.css'

//import Header from './Header';

//import Login from './pages/Login';

import Routes from './routes';

//Componente em React é uma função que Retorna HTML.
function App() {
  return (
    /*JSX(XML) é quando o HTML esta integrado dentro do javascript.
    <h1> Hello Word </h1>*/

    /*Passar uma Propriedade para o Componente Header
    <Header title="Semana OmniStack"/>
    */

    //Passar uma Propriedade para o Componente Header com children
    <Routes />
    
  );
}

export default App;
