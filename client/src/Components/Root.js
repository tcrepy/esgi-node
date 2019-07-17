import React from 'react'
import {Router, Route} from 'react-router-dom'
import {App} from "./App";
import {history} from "../_helper/history";
import {RegisterContainer} from "./Users/RegisterContainer";
import {UserProvider} from "../Provider/UserProvider";
import {LinkConstants} from "../_constants/link.constants";
import {AlertProvider} from "../Provider/AlertProvider";
import {LoginContainer} from "./Users/LoginContainer";
import {LogoutContainer} from "./Users/LogoutContainer";
import {CategoryProvider} from "../Provider/CategoryProvider";
import {CategoriesList} from "./TechWatch/CategoriesList";
import {PostProvider} from "../Provider/PostProvider";
import {PostsList} from "./TechWatch/PostsList";
import {AddContainer} from "./TechWatch/AddContainer";
import {CategoryCreate} from "./TechWatch/CategoryCreate";


const Root = () => (
    <div className="App">
        <AlertProvider>
            <UserProvider>
                <Router history={history}> <Route path="/" component={App}/>
                    <main>

                        <Route exact path={LinkConstants.LOGIN} component={LoginContainer}/>
                        <Route exact path={LinkConstants.LOGOUT} component={LogoutContainer}/>
                        <Route exact path={LinkConstants.REGISTER} component={RegisterContainer}/>


                        <PostProvider>
                        <Route exact path={LinkConstants.POST_LIST} component={PostsList}/>
                        <Route exact path={LinkConstants.POST_CREATE} component={AddContainer}/>
                        </PostProvider>

                        <CategoryProvider>
                        <Route exact path={LinkConstants.CATEGORY_LIST} component={CategoriesList}/>
                        <Route exact path={LinkConstants.CATEGORY_CREATE} component={CategoryCreate}/>
                        </CategoryProvider>
                    </main>
                </Router>
            </UserProvider>
        </AlertProvider>
    </div>
);

export default Root