import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';


import FormsDataModel from "./models/FormsDataModel";
import App from './components/App';

const store = new FormsDataModel();

render(
    <Provider store={store}>
        <div className={"container"}>
            <DevTools />
            <HashRouter>
                <App store={store} />
            </HashRouter>
        </div>
    </Provider>,
  document.getElementById("root")
);


// playing around in the console
window.store = store;
