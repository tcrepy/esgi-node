import React from 'react';
import {connect} from 'react-redux';
import {userActions} from "../../redux/actions/UserAction";
import {Login} from "./Login";

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        if (localStorage.user) {
            this.props.dispatch(userActions.logout());
        }

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loggedOut: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {username, password} = this.state;
        const {dispatch} = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const {loggingIn, loggedOut } = this.props;
        const {username, password, submitted} = this.state;
        return (
            <Login username={username} password={password} submitted={submitted} handleChange={this.handleChange} handleSubmit={this.handleSubmit} loggingIn={loggingIn} loggedOut={loggedOut}/>
        );
    }
}

function mapStateToProps(state) {
    const {loggingIn, loggedOut} = state.authentication;
    return {
        loggingIn,
        loggedOut
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginContainer);
export {connectedLoginPage as LoginPage};