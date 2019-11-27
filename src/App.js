import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

import HomeComponent from './components/Home';

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
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
