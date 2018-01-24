import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import FormList from "./FormList";
import FromData from "./FormData"

@inject('store')
@withRouter
@observer
export default class App extends React.Component {
    componentWillMount() {
        this.props.store.loadFormsData();
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/form" component={FromData} />
                    <Route path="/" component={FormList} />
                </Switch>
            </div>
        );
    }
}
