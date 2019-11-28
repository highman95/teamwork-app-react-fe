import React from 'react';
import SignInComponent from './users/SignIn';
import './Home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <div className="home-intro">
                    Welcome to the
                    {' '}
                    <strong>TeamWork</strong>
                    {' '}
                    app
                </div>
                <div className="home-sign-in">
                    <SignInComponent {...this.props} />
                </div>
            </>
        );
    }
}

export default Home;
