import React from 'react';

import endPoints from '../../constants/endpoints';
import { fetchToken, fetchBot } from '../../constants/helpers';
import './PostForm.css';
import './Post.css';

export function CreateGifPost() {
    return (
        <>
            <h3>Add Gif</h3>
            <hr />
            <GifPostForm />
        </>
    );
}


class GifPostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSaving: false,
            message: null,
            error: null,
            title: '',
            image: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(event) {
        let {
            name, value, type, files,
        } = event.target;
        value = (type === 'file') ? files[0] : value;

        this.setState({ [name]: value });
    }

    handleSave(event) {
        event.preventDefault();

        const { title, image } = this.state;
        this.addPost(title, image);
    }

    async addPost(title, image) {
        if (title !== undefined && image !== undefined) {
            this.setState({ isSaving: true, message: null, error: null });

            const formData = new FormData();
            formData.append('title', title);
            formData.append('image', image);

            const fetchConfig = {
                method: 'POST',
                mode: 'cors',
                body: formData,
                headers: {
                    token: fetchToken(),
                },
            };

            try {
                const result = await fetchBot(endPoints.gifs, fetchConfig)
                const { message } = result.data;

                this.setState({
                    isSaving: false, message, error: null, title: '', image: '',
                });
            } catch (e) {
                this.setState({ isSaving: false, message: null, error: e.message || e.error.message })
            }
        }
    }

    render() {
        const {
            isSaving, message, error, title,
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
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={this.handleChange}
                                        required
                                        disabled={isSaving}
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Image:
                                    <input type="file" name="image" onChange={this.handleChange} required disabled={isSaving} />
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
