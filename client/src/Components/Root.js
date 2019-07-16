import React from 'react'
import {Provider} from 'react-redux'
import {Router, Route} from 'react-router-dom'
import {App} from "./App";
import {history} from "../_helper/history";
import {RegisterPage} from "./Users/RegisterContainer";
import {ListPage} from "./Nav/Page/ListPage";
import {LoginPage} from "./Nav/Page/LoginPage";
import {UserProvider} from "../Provider/UserProvider";
import {LogoutPage} from "./Nav/Page/LogoutPage";
import {LinkConstants} from "../_constants/link.constants";


const Root = () => (
    <div className="App">
        <UserProvider>
            <Router history={history}> <Route path="/" component={App}/>
                <main>
                    <Route exact path={LinkConstants.POST_LIST} component={ListPage}/>
                    <Route path={LinkConstants.LOGIN} component={LoginPage}/>
                    <Route path={LinkConstants.LOGOUT} component={LogoutPage}/>
                    <Route path={LinkConstants.REGISTER} component={RegisterPage}/>
                </main>
            </Router>
        </UserProvider>
    </div>
);

export default Root