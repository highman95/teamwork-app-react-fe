import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CommentsComponent from './Comments';
import endPoints from '../../constants/endpoints';
import { fetchToken } from '../../constants/helpers';
import './Post.css';

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            error: null,
            post: {
                comments: [],
            },
        };
    }

    componentDidMount() {
        const { post } = this.props;

        if (post.id !== undefined) {
            this.setState({ post });
        } else {
            const { match: { params: { postType, postId } } } = this.props;

            if (postId !== undefined) {
                const isGifPost = (postType === 'gif');
                this.fetchPost(postId, isGifPost);
            }
        }
    }

    async fetchPost(postId, isGifPost) {
        this.setState({ error: null, isLoading: true });

        const url = isGifPost ? endPoints.gifs : endPoints.articles;
        const fetchConfig = {
            headers: {
                'Content-Type': 'application/json',
                token: fetchToken(),
            },
        };

        await fetch(`${url}/${postId}`, fetchConfig).then((resp) => resp.json()).then((result) => {
            if (result.status === 'error') {
                throw new Error(result.error);
            }

            this.setState({ isLoading: false, error: null, post: result.data });
        }).catch((e) => this.setState({ isLoading: false, error: e.message || e.error.message }));
    }

    render() {
        const { isLoading, error, post } = this.state;
        const { comments } = post;

        return (
            <>
                {isLoading && <div className="loading-box">Loading Post...</div>}
                {error && <span className="message error">{error}</span>}

                {post
                    ? (
                        <div className="">
                            <div className="post-title">
                                <Link to={`/post/${post.type}/${post.id}`}>{post.title}</Link>
                            </div>

                            <div className="post-content">
                                {post.article !== undefined
                                    ? <div className="post-content-text">{post.article}</div>
                                    : <img src={post.url} alt={`${post.title}-${Date.now()}`} className="post-content-image" />}
                            </div>

                            <CommentsComponent comments={comments} />
                        </div>
                    ) : <h4>Post does not exist...</h4>}

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
