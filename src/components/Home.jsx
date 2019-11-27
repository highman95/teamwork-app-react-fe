import React from 'react';

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
                <div className="home-sign-in" />
            </>
        );
    }
}

export default Home;
