import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import './App.css';

import HomeComponent from './components/Home';
import FeedComponent from './components/posts/Feed';
import NotFoundComponent from './components/NotFound';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="App">
                <header className="app-header">
                    <Link to="/">
                        <span id="app-logo">TeamWork</span>
                    </Link>
                </header>

                <div className="app-content-wrapper">
                    <Switch>
                        <Route path="/" component={HomeComponent} exact />
                        <AuthenticatedRoute path="/feed" component={FeedComponent} exact />
                        <Route path="*" component={NotFoundComponent} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
