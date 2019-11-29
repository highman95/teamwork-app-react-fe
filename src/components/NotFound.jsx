import React from 'react';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <h3>Oops!!!</h3>
                <div>This page no longer exists...</div>
            </>
        );
    }
}

export default NotFound;
