import React from 'react';
import { Link } from 'react-router-dom';
import endPoints from '../../constants/endpoints';
import { storageId } from '../../constants/helpers';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSigningIn: false,
            email: '',
            password: '',
            error: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: null, isSigningIn: true });

        const { email, password } = this.state;
        const fetchData = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(endPoints.signIn, fetchData).then((resp) => resp.json()).then((result) => {
            if (result.status === 'error') {
                throw new Error(result.error);
            }

            const { token, firstName } = result.data;
            localStorage.setItem(storageId, JSON.stringify({ token, firstName }));
            this.setState({ error: null, isSigningIn: false, password: '' });
            window.location = '/feed';
        }).catch((e) => this.setState({ error: e.message || e.error.message, isSigningIn: false, password: '' }));
    }

    render() {
        const {
            email, password, isSigningIn, error,
        } = this.state;

        return (
            <>
                {error && <span className="message error">{error}</span>}

                <form>
                    <div className="form-group">
                        <label>
                            E-mail Address:
                            <input type="email" name="email" value={email} onChange={this.handleChange} required />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Password:
                            <input type="password" name="password" value={password} onChange={this.handleChange} required />
                        </label>
                    </div>

                    <div className="form-group">
                        <button type="submit" onClick={this.handleSubmit} disabled={isSigningIn}>
                            {isSigningIn ? 'Signing in...' : 'Sign in'}
                        </button>
                        {' '}
                        <Link to="/user/create">Sign UP!</Link>
                    </div>
                </form>
            </>
                );
            }
        }
        
        export default SignIn;
