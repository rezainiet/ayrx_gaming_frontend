import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PKmGjDYUg5iGXsDLr9aKfeZx6aGJ7br9MS4t3TiBTmribrZfhe3eRR4dv1p0pbOV64OJ2c5ydU7xW69mwF7kXNr00u4kFdhdP');

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Elements stripe={stripePromise}>
            <App />
            <Toaster />
          </Elements>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
