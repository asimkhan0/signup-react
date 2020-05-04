import React from 'react';
import { createBrowserHistory } from "history";
import Store from './redux/store/index'
import { Provider } from 'react-redux';
import SignUp from './containers/pages/signUp/index';
import Routes from './routes/index';
const App = () => {
  return (
    <Provider store={Store}>
      <Routes history={createBrowserHistory()} />
    </Provider >
  );
}

export default App;
