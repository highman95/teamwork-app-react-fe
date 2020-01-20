import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CommentsComponent from './Comments';
import endPoints from '../../constants/endpoints';
import { fetchToken, fetchBot } from '../../constants/helpers';
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
            this.fetchPost(postId, postType);
        }
    }

    async fetchPost(postId, postType) {
        if (postId !== undefined && postType !== undefined) {
            this.setState({ error: null, isLoading: true });

            const endPointX = (postType === 'gif') ? endPoints.gifs : endPoints.articles;
            const fetchConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    token: fetchToken(),
                },
            };

            try {
                const result = await fetchBot(`${endPointX}/${postId}`, fetchConfig)
                this.setState({ isLoading: false, error: null, post: result.data });
            } catch (e) {
                this.setState({ isLoading: false, error: e.message || e.error.message })
            }
        }
    }

    render() {
        const { showComments } = this.props;
        const { isLoading, error, post = {} } = this.state;
        const { comments } = post;
        const postType = post.article ? 'article' : 'gif';

        return (
            <>
                {error && <span className="message error">{error}</span>}

                {isLoading
                    ? <div className="loading-box">Loading Post...</div>
                    : (post
                        ? (
                            <div className="">
                                <div className="post-title">
                                    <Link to={`/post/${postType}/${post.id}`}>{post.title}</Link>
                                    <div className="post-task-link">
                                        {!!post.article
                                            && <Link to={`/${postType}/edit/${post.id}`} className="edit-link">Edit</Link>}
                                        <Link to={`/${postType}/delete/${post.id}`} className="delete-link">Delete</Link>
                                    </div>
                                </div>

                                <div className="post-content">
                                    {!!post.article
                                        ? <div className="post-content-text">{post.article}</div>
                                        : <img src={post.url} alt={`${post.title}-${Date.now()}`} className="post-content-image" />}
                                </div>

                                {showComments && <CommentsComponent comments={comments} postId={post.id} postType={postType} />}
                            </div>
                        )
                        : <h4>Post does not exist...</h4>)}

            </>
        );
    }
}

Post.defaultProps = {
    showComments: true,
    // showTrimmed: false,
    post: {},
};

Post.propTypes = {
    showComments: PropTypes.bool,
    // showTrimmed: PropTypes.bool,
    post: PropTypes.object || null,
};

export default Post;
