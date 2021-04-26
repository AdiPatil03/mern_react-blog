import React from 'react';
import ReactDOM from 'react-dom';
import {PersistGate} from 'redux-persist/integration/react';

import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';

import App from './App';
import './index.css';
import './i18n';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
