import React from 'react';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import './App.css';

import HomeComponent from './components/Home';
import FeedComponent from './components/posts/Feed';
import PostComponent from './components/posts/Post';
import { CreateArticlePost, EditArticlePost } from './components/posts/ArticlePostForm';
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

                    <div className="nav-menu-wrapper">
                        <ul className="nav-menu">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/feed">Feed</NavLink></li>
                            <li><NavLink to="/logout">Logout</NavLink></li>
                        </ul>
                    </div>
                </header>

                <div className="app-content-wrapper">
                    <Switch>
                        <Route path="/" component={HomeComponent} exact />
                        <AuthenticatedRoute path="/feed" component={FeedComponent} exact />
                        <AuthenticatedRoute path="/article/create" component={CreateArticlePost} exact />
                        <AuthenticatedRoute path="/article/edit/:postId" component={EditArticlePost} exact />
                        <AuthenticatedRoute path="/post/:postType/:postId" component={PostComponent} exact />
                        <Route path="*" component={NotFoundComponent} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
