import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HashRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <App />
      </PersistGate>
    </Provider>
  </HashRouter>
);
