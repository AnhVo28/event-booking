import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { configureStore } from './app/store/configureStore';
import 'semantic-ui-css/semantic.min.css';
import App from './app/layout/App.jsx';
import ScollToTop from './app/common/util/SrollToTop';
import registerServiceWorker from './registerServiceWorker';
import { loadEvents } from './features/event/eventActions';
import ReduxToastr from 'react-redux-toastr';


const store = configureStore();
store.dispatch(loadEvents());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScollToTop>
                <ReduxToastr
                    timeOut= {3000}
                    position='bottom-right'
                    transitionIn='fadeIn'
                    transitionOut='fadeOut'/>
                <App />
            </ScollToTop>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
