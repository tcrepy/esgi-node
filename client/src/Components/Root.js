import React from 'react'
import {Router, Route} from 'react-router-dom'
import {App} from "./App";
import {history} from "../_helper/history";
import {RegisterPage} from "./Users/RegisterContainer";
import {ListPage} from "./Nav/Page/ListPage";
import {LoginPage} from "./Nav/Page/LoginPage";
import {UserProvider} from "../Provider/UserProvider";
import {LogoutPage} from "./Nav/Page/LogoutPage";
import {LinkConstants} from "../_constants/link.constants";
import {AlertProvider} from "../Provider/AlertProvider";


const Root = () => (
    <div className="App">
        <AlertProvider>
            <UserProvider>
                <Router history={history}> <Route path="/" component={App}/>
                    <main>
                        <Route exact path={LinkConstants.POST_LIST} component={ListPage}/>
                        <Route path={LinkConstants.LOGIN} component={LoginPage}/>
                        <Route path={LinkConstants.LOGOUT} component={LogoutPage}/>
                        <Route path={LinkConstants.REGISTER} component={RegisterContainer}/>
                    </main>
                </Router>
            </UserProvider>
        </AlertProvider>
    </div>
);

export default Root