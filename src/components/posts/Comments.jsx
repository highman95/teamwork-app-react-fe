import React from 'react';
import PropTypes from 'prop-types';

import CommentForm from './CommentForm';
import './Comment.css';

class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            comments: [],
            postId: '',
            postType: '',
        };

        this.handleCommentsChange = this.handleCommentsChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        const { comments, postId, postType } = props;
        const { comments: commentsFromState, postId: postIdFromState } = state;
        const hasSamePropsAsState = (comments.length === commentsFromState.length && postId === postIdFromState);

        return hasSamePropsAsState ? null : { comments, postId, postType };
    }

    handleCommentsChange(comment) {
        const { comments } = this.state;
        comments.push(comment);

        this.setState({ ...comments });
    }

    render() {
        const {
            isLoading, comments, postId, postType,
        } = this.state;
        const commentsMap = comments && comments.map((comment) => <Comment key={comment.commentId} comment={comment} />);

        return (
            <>
                {isLoading
                    ? <div className="loading-box">Loading Comments...</div>
                    : (
                        <div className="post-comments-box">
                            {commentsMap}
                            <CommentForm postId={postId} postType={postType} onCommentSave={this.handleCommentsChange} />
                        </div>
                    )}
            </>
        );
    }
}

Comments.defaultProps = {
    comments: [],
    postId: '',
    postType: '',
};

Comments.propTypes = {
    comments: PropTypes.array,
    postId: PropTypes.string.isRequired,
    postType: PropTypes.string.isRequired,
};

const Comment = ({ comment }) => (
    <div className="comment-wrapper">
        <div className="comment-box">{comment.comment}</div>
        <div className="author-box">
            {comment.authorName || `User-${comment.authorId}`}
        </div>
    </div>
);

export default Comments;
