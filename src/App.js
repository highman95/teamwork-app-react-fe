import React from 'react';
import {
    Switch, Route, Link, NavLink,
} from 'react-router-dom';
import { isLoggedIn, signOut } from './constants/helpers';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import './App.css';

import HomeComponent from './components/Home';
import FeedComponent from './components/posts/Feed';
import PostComponent from './components/posts/Post';
import { CreateArticlePost, EditArticlePost } from './components/posts/ArticlePostForm';
import { CreateGifPost } from './components/posts/GifPostForm';
import DeletePostComponent from './components/posts/DeletePost';
import { CreateUserAccount } from './components/users/UserForm';
import NotFoundComponent from './components/NotFound';

class App extends React.Component {
    static logOut(event) {
        event.preventDefault();
        signOut();
        // return <Redirect to="/" />;
    }

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
                            {isLoggedIn && (
                                <>
                                    <li><NavLink to="/feed">Feed</NavLink></li>
                                    <li><NavLink to="/article/create">Add Article</NavLink></li>
                                    <li><NavLink to="/gif/create">Add Gif</NavLink></li>
                                    <li><NavLink to="/user/create">Add User</NavLink></li>
                                    <li><NavLink to="#" onClick={App.logOut}>Logout</NavLink></li>
                                </>
                            )}
                        </ul>
                    </div>
                </header>

                <div className="app-content-wrapper">
                    <Switch>
                        <Route path="/" component={HomeComponent} exact />
                        <AuthenticatedRoute path="/feed" component={FeedComponent} exact />
                        <AuthenticatedRoute path="/article/create" component={CreateArticlePost} exact />
                        <AuthenticatedRoute path="/article/edit/:postId" component={EditArticlePost} exact />
                        <AuthenticatedRoute path="/gif/create" component={CreateGifPost} exact />
                        <AuthenticatedRoute path="/post/:postType/:postId" component={PostComponent} exact />
                        <AuthenticatedRoute path="/:postType/delete/:postId" component={DeletePostComponent} exact />
                        <Route path="/user/create" component={CreateUserAccount} exact />
                        <Route path="*" component={NotFoundComponent} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
