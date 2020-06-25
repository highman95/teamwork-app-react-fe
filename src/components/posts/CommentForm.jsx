import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import endPoints from '../../constants/endpoints';
import { fetchToken, fetchBot } from '../../constants/helpers';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSaving: false,
            error: null,
            comment: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(event) {
        this.setState({ comment: event.target.value });
    }

    handleSave(event) {
        event.preventDefault();

        const { postType, postId } = this.props;
        const { comment } = this.state;
        this.addComment(comment, postId, postType);
    }

    async addComment(comment, postId, postType) {
        if (!!postId && !!postType) {
            this.setState({ error: null, isSaving: true });

            const endPointX = (postType === 'gif') ? endPoints.gifs : endPoints.articles;
            const fetchConfig = {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({ comment }),
                headers: {
                    'Content-Type': 'application/json',
                    token: fetchToken(),
                },
            };

            try {
                await fetchBot(`${endPointX}/${postId}/comment`, fetchConfig);

                const { onCommentSave } = this.props;
                onCommentSave({
                    commentId: Date.now(), comment, authorId: 0, authorName: 'You',
                });
                this.setState({ isSaving: false, error: null, comment: '' });
            } catch (e) {
                this.setState({ isSaving: false, error: e.message || e.error.message });
            }
        }
    }

    render() {
        const { comment, error, isSaving } = this.state;

        return (
            <div className="comment-form">
                {error && <span className="message error">{error}</span>}

                <form>
                    <textarea onChange={this.handleChange} value={comment} placeholder="Add a comment..." disabled={isSaving} />
                    <button type="submit" onClick={this.handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    {' '}
                    <small><Link to="/feed">Feed &rarr;</Link></small>
                </form>
            </div>
        );
    }
}

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
    postType: PropTypes.string.isRequired,
    onCommentSave: PropTypes.func.isRequired,
};

export default CommentForm;
