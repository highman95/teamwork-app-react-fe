import React from 'react';
import PropTypes from 'prop-types';
import './Comment.css';

class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            comments: [],
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { comments } = props;
        const { comments: commentsState } = state;

        return (comments.length === commentsState.length) ? null : { comments };
    }

    render() {
        const { isLoading, comments } = this.state;
        const commentsMap = comments && comments.map((comment) => <Comment key={comment.commentId} comment={comment} />);

        return (
            <>
                {isLoading && <div className="loading-box">Loading Comments...</div>}
                <div className="post-comments-box">
                    {commentsMap}
                </div>
            </>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.array,
};

const Comment = ({ comment }) => (
    <div className="comment-wrapper">
        <div className="comment-box">{comment.comment}</div>
        <div className="author-box">
            {comment.authorName || `User - ${comment.authorId}`}
        </div>
    </div>
);

export default Comments;
