import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Post.css';

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            error: null,
            post: {},
        };
    }

    componentDidMount() {
        const { post } = this.props;

        if (post) {
            this.setState({ post });
        }
    }

    render() {
        const { post } = this.state;

        return (
            <>
                {post
                    ? <>
                        <div className="post-title">
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </div>

                        <div className="post-content">
                            {post.article !== undefined
                                ? <div className="post-content-text">{post.article}</div>
                                : <img src={post.url} alt={`${post.title}-${Date.now()}`} className="post-content-image" />}
                        </div>
                    </>
                    : <h4>Post does not exist...</h4>}
            </>
        );
    }
}

Post.defaultProps = {
    showTrimmed: false,
    post: {},
};

Post.propTypes = {
    showTrimmed: PropTypes.bool,
    post: PropTypes.object || null,
};

export default Post;
