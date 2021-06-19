import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './constants/theme';
import Routes from './components/routes';
import configureStore from './store';

function App() {
  const store = configureStore();

  return (
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <BrowserRouter>
                  <Switch>
                      <Routes/>
                  </Switch>
              </BrowserRouter>
          </ThemeProvider>
      </Provider>
  );
}

export default App;
