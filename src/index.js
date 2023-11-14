import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import "./i18n";
import {Spinner} from "react-bootstrap";
import {store} from "./store";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import MetaPixel from "./components/MetaPixel";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MetaPixel/>
      <Suspense fallback={<Spinner animation="border" variant="secondary" />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
);

