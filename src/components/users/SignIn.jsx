import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSigningIn: false,
            email: '',
            password: '',
            // error: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSignIn(event) {
        event.preventDefault();
        this.setState({ isSigningIn: true });
    }

    render() {
        const { email, password, isSigningIn } = this.state;

        return (
            <>
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
                        <button type="submit" onClick={this.handleSignIn} disabled={isSigningIn}>
                            {isSigningIn ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </>
        );
    }
}

export default SignIn;
