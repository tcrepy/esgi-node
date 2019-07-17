import React from 'react'
import {Router, Route} from 'react-router-dom'
import {App} from "./App";
import {history} from "../_helper/history";
import {RegisterContainer} from "./Users/RegisterContainer";
import {ListPage} from "./Nav/Page/ListPage";
import {LoginPage} from "./Nav/Page/LoginPage";
import {UserProvider} from "../Provider/UserProvider";
import {LogoutPage} from "./Nav/Page/LogoutPage";
import {LinkConstants} from "../_constants/link.constants";
import {AlertProvider} from "../Provider/AlertProvider";
import {NewPostPage} from "./Nav/Page/TechWatch/NewPostPage";


const Root = () => (
    <div className="App">
        <AlertProvider>
            <UserProvider>
                <Router history={history}> <Route path="/" component={App}/>
                    <main>
                        <Route exact path={LinkConstants.POST_LIST} component={ListPage}/>
                        <Route exact path={LinkConstants.LOGIN} component={LoginPage}/>
                        <Route exact path={LinkConstants.LOGOUT} component={LogoutPage}/>
                        <Route exact path={LinkConstants.REGISTER} component={RegisterContainer}/>
                        <Route exact path={LinkConstants.POST_CREATE} component={NewPostPage}/>
                    </main>
                </Router>
            </UserProvider>
        </AlertProvider>
    </div>
);

export default Root