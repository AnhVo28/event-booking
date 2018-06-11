import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import { configureStore } from './app/store/configureStore';
import 'semantic-ui-css/semantic.min.css';
import App from './app/layout/App.jsx';
import ScollToTop from './app/common/util/SrollToTop';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScollToTop>
                <App />
            </ScollToTop>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
