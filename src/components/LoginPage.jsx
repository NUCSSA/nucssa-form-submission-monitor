import React  from "react";
import { observer, inject } from "mobx-react";

import { FormControl, Button, Alert } from "react-bootstrap";

@inject('store')
@observer
class LoginPage extends React.Component {
    componentWillMount() {
        this.state = {
            password: '',
            incorrectPassword: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            password: e.target.value
        });

    }

    handleSignIn(e) {
        e.preventDefault();
        let store = this.props.store;
        store.checkPassword(this.state.password);

        this.setState({
            password: '',
            incorrectPassword: true,
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSignIn(e);
        }
    }

    renderErrorMessage() {
        if (this.state.incorrectPassword) {
            return (
                <Alert bsStyle="danger">
                    <strong>Incorrect Password</strong>
                </Alert>
            );
        }
    }

    render() {

        return (
            <div>
                <h1>Password</h1>
                { this.renderErrorMessage() }
                <form>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                        />

                </form>
                <Button bsStyle="primary" onClick={this.handleSignIn} bsSize="large" block>
                    Sign In
                </Button>


            </div>);

    }

}

export default LoginPage;
