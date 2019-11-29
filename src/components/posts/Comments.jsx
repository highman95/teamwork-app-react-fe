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

    componentDidMount() {
        const { comments } = this.props;
        this.setState({ comments });
    }

    render() {
        const { isLoading } = this.state;
        const { comments } = this.props;
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
        <div className="author-box">
            User &mdash;
            {comment.authorId}
        </div>
        <div className="comment-box">{comment.comment}</div>
    </div>
);

export default Comments;
