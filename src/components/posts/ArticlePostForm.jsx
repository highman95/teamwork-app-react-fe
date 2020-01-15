import React from 'react';

import endPoints from '../../constants/endpoints';
import { fetchToken, handleErrorResult } from '../../constants/helpers';
import './PostForm.css';
import './Post.css';

export function CreateArticlePost() {
    return (
        <>
            <h3>Add Article</h3>
            <hr />
            <ArticlePostForm />
        </>
    );
}

export function EditArticlePost(props) {
    const { postId } = props.match.params;
    return (
        <>
            <h3>Edit Article</h3>
            <hr />
            <ArticlePostForm postId={postId} />
        </>
    );
}

class ArticlePostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSaving: false,
            message: null,
            error: null,
            title: '',
            article: '',
            postId: props.postId || 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        const { postId, isSaving } = this.state;

        if (postId !== 0) {
            this.setState({ isSaving: true });
            this.fetchPost(postId, 'article');
            this.setState({ isSaving });
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSave(event) {
        event.preventDefault();

        const { title, article, postId } = this.state;

        if (postId === 0) {
            this.addPost(title, article);
        } else {
            this.updatePost(postId, title, article);
        }
    }

    async addPost(title, article) {
        if (title !== undefined && article !== undefined) {
            this.setState({ isSaving: true, message: null, error: null });

            const fetchConfig = {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({ title, article }),
                headers: {
                    'Content-Type': 'application/json',
                    token: fetchToken(),
                },
            };

            try {
                const response = await fetch(`${endPoints.articles}`, fetchConfig)
                const result = await response.json()

                if (result.status === 'error') {
                    handleErrorResult(result.error);
                }

                // const showPost = () => {
                //     return (
                //         <div className="post-title">
                //             <Link to={`/post/article/${articleId}`}>{title}</Link>
                //         </div>
                //     );
                // };

                const { message } = result.data;
                // document.querySelector('#post-form-reporter').innerHTML += showPost();

                this.setState({
                    isSaving: false, message, error: null, title: '', article: '',
                });
            } catch (e) {
                this.setState({ isSaving: false, message: null, error: e.message || e.error.message })
            }
        }
    }

    async fetchPost(postId, postType) {
        if (postId !== undefined && postId !== 0 && postType !== undefined) {
            this.setState({ error: null, isLoading: true });

            const url = (postType === 'gif') ? endPoints.gifs : endPoints.articles;
            const fetchConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    token: fetchToken(),
                },
            };

            try {
                const response = await fetch(`${url}/${postId}`, fetchConfig)
                const result = await response.json()

                if (result.status === 'error') {
                    handleErrorResult(result.error);
                }

                const { title, article } = result.data;
                this.setState({
                    isLoading: false, error: null, title, article,
                });
            } catch (e) {
                this.setState({ isLoading: false, error: e.message || e.error.message })
            }
        }
    }

    async updatePost(postId, title, article) {
        if (postId !== undefined && title !== undefined && article !== undefined) {
            this.setState({ isSaving: true, message: null, error: null });

            const fetchConfig = {
                method: 'PATCH',
                mode: 'cors',
                body: JSON.stringify({ title, article }),
                headers: {
                    'Content-Type': 'application/json',
                    token: fetchToken(),
                },
            };

            try {
                const response = await fetch(`${endPoints.articles}/${postId}`, fetchConfig)
                const result = await response.json()

                if (result.status === 'error') {
                    handleErrorResult(result.error);
                }

                const { message } = result.data;
                this.setState({ isSaving: false, message, error: null });
            } catch (e) {
                this.setState({ isSaving: false, message: null, error: e.message || e.error.message })
            }
        }
    }

    render() {
        const {
            isSaving, message, error, title, article,
        } = this.state;

        return (
            <>
                <div className="post-form-wrapper">
                    {message && <span className="message success">{message}</span>}
                    {error && <span className="message error">{error}</span>}

                    <div className="post-form-display">
                        <form>
                            <div className="form-group">
                                <label>
                                    Title:
                                    <input type="text" name="title" value={title} onChange={this.handleChange} required disabled={isSaving} />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Content:
                                    <textarea name="article" rows="7" value={article} onChange={this.handleChange} required disabled={isSaving} />
                                </label>
                            </div>
                            <div className="form-group">
                                <button type="submit" onClick={this.handleSave} disabled={isSaving}>
                                    {isSaving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div id="post-form-reporter" />
                </div>
            </>
        );
    }
}
