import React from 'react';
import Post from './Post';
import endPoints from '../../constants/endpoints';
import { fetchToken } from '../../constants/helpers';

class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            error: null,
            feeds: [],
        };
    }

    componentDidMount() {
        this.fetchFeeds();
    }

    async fetchFeeds() {
        this.setState({ error: null, isLoading: true });

        const fetchConfig = {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                token: fetchToken(),
            },
        };

        await fetch(endPoints.feeds, fetchConfig).then((resp) => resp.json()).then((result) => {
            if (result.status === 'error') {
                throw new Error(result.error);
            }

            this.setState({ isLoading: false, error: null, feeds: result.data });
        }).catch((e) => this.setState({ isLoading: false, error: e.message || e.error.message }));
    }

    render() {
        const { isLoading, feeds } = this.state;
        const feedsMap = feeds.map((post, index) => <Post key={index} showTrimmed post={post} />);

        return (
            <>
                {isLoading && <div className="loading-box">Loading...</div>}
                {feedsMap}
            </>
        );
    }
}

export default Feed;
