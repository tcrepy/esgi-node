import React from 'react';
import '../App.css';
import {HeaderPage} from "./Nav/HeaderContainer.jsx";
import {history} from "../_helper/history";
import {connect} from "react-redux";
import {alertActions} from "../redux/actions/AlertAction";

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
    render() {
        const { alert } = this.props;
        return (
            <>
                <HeaderPage/>
                {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
            </>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };