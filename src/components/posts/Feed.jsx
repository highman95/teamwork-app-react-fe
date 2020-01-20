import React from 'react';
import Post from './Post';
import endPoints from '../../constants/endpoints';
import { fetchToken, fetchBot } from '../../constants/helpers';

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

        try {
            const result = await fetchBot(endPoints.feeds, fetchConfig)
            this.setState({ isLoading: false, error: null, feeds: result.data });
        } catch (e) {
            this.setState({ isLoading: false, error: e.message || e.error.message })
        }
    }

    render() {
        const { isLoading, error, feeds } = this.state;
        const feedsMap = feeds.map((post) => <Post key={post.id} showComments={false} post={post} />);

        return (
            <>
                {error && <span className="message error">{error}</span>}

                {isLoading
                    ? <div className="loading-box">Loading Feeds...</div>
                    : feedsMap}
            </>
        );
    }
}

export default Feed;
