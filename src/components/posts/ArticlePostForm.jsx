import React from 'react';
import { Link } from 'react-router-dom';

import endPoints from '../../constants/endpoints';
import { fetchToken } from '../../constants/helpers';
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

class ArticlePostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSaving: false,
            message: null,
            error: null,
            title: '',
            article: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSave(event) {
        event.preventDefault();

        const { title, article } = this.state;
        this.addPost(title, article);
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

            await fetch(`${endPoints.articles}`, fetchConfig).then((resp) => resp.json()).then((result) => {
                if (result.status === 'error') {
                    throw new Error(result.error);
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

                this.setState({ isSaving: false, message, error: null, title: '', article: '' });
            }).catch((e) => this.setState({ isSaving: false, message: null, error: e.message || e.error.message }));
        }
    }

    render() {
        const { isSaving, message, error, title, article } = this.state;

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
                    <div id="post-form-reporter"></div>
                </div>
            </>
        );
    }
}
