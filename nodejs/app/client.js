import React from 'react';
import {browserHistory, Router} from 'react-router';
import {render} from 'react-dom';

import routes from './routes';

render((
    <Router history={browserHistory}>
        {routes}
    </Router>
), document.querySelectorAll('[data-ui-role="content"]')[0]);
