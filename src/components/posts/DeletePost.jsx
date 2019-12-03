import React from 'react';

import endPoints from '../../constants/endpoints';
import { fetchToken } from '../../constants/helpers';
import endpoints from '../../constants/endpoints';

class DeletePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDeleting: false,
            message: null,
            error: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const { postId, postType } = this.props.match.params;
        this.deletePost(postId, postType);
    }

    async deletePost(postId, postType) {
        if (postId !== undefined && postType !== undefined) {
            this.setState({ isDeleting: true });

            const url = (postType === 'gif') ? endPoints.gifs : endpoints.articles;
            const fetchConfig = {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    token: fetchToken(),
                }
            };

            await fetch(`${url}/${postId}`, fetchConfig).then(resp => resp.json()).then(result => {
                if (result.status === 'error') {
                    throw new Error(result.error);
                }

                this.setState({ isDeleting: false, error: null, message: result.data.message });
            }).catch((e) => this.setState({ isDeleting: false, message: null, error: e.message || e.error.message }));
        }
    }

    render() {
        const { postType } = this.props.match.params;
        const { isDeleting, message, error } = this.state;

        return (
            <>
                {message && <span className="message success">{message}</span>}
                {error && <span className="message error">{error}</span>}

                <div>
                    <div>Are you sure you want to delete the <strong>{postType}</strong> Post?</div>

                    <button type="submit" onClick={this.handleSubmit} disabled={isDeleting}>
                        {isDeleting ? 'Deleting' : 'Continue'}
                    </button>
                </div>
            </>
        );
    }
}

export default DeletePost;
