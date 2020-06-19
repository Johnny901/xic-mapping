import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import XicCodes from './pages/xic-codes';

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/xic-codes' component={XicCodes} />
        </Switch>
    )
}

export default Routes;
