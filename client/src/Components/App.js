import React from 'react';
import '../App.css';
import {HeaderPage} from "./Nav/HeaderContainer.jsx";
import {history} from "../_helper/history";
import {Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import {alertActions} from "../redux/actions/AlertAction";
import {LoginPage} from "./Users/LoginContainer";
import {ListPage} from "./TechWatch/ListContainer.jsx";

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
            <div className="App">
                <Router history={history}>
                    <HeaderPage/>
                    {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
                    <div>
                        <Route path="/" component={ListPage}/>
                        <Route path="/login" component={LoginPage}/>
                    </div>
                </Router>

                <main>

                </main>
            </div>
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