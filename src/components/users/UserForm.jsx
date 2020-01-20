import React from 'react';
import endPoints from '../../constants/endpoints';
import { storageId, isLoggedIn, fetchBot } from '../../constants/helpers';

export function CreateUserAccount() {
    return (
        <>
            <h3>Register User Account</h3>
            <hr />
            <UserForm />
        </>
    );
}

export function EditUserAccount() {
    return (
        <>
            <h3>Edit User Account</h3>
            <hr />
            <UserForm />
        </>
    );
}


class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSaving: false,
            isRequesting: false,
            message: null,
            error: null,
            jobRoles: [],
            departments: [],
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            gender: 'male',
            jobRole: '',
            department: '',
            address: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.populateFields();
    }

    componentDidMount() {
    }

    async populateFields() {
        this.setState({ isRequesting: true });
        const fetchConfig = {
            mode: 'cors',
        };

        try {
            const result = await fetchBot(endPoints.roles, fetchConfig)
            const result2 = await fetchBot(endPoints.departments, fetchConfig)

            const jobRoles = result.data;
            const departments = result2.data;

            this.setState({
                isRequesting: false, jobRole: jobRoles[0].name, jobRoles, department: departments[0].name, departments,
            });
        } catch (e) {
            this.setState({ error: e.message || e.error.message, isRequesting: false })
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const {
            firstName, lastName, email, password, gender, jobRole, department, address,
        } = this.state;
        this.addUser(firstName, lastName, email, password, gender, jobRole, department, address);
    }

    async addUser(firstName, lastName, email, password, gender, jobRole, department, address) {
        this.setState({ isSaving: true, message: null });
        const fetchConfig = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                firstName, lastName, email, password, gender, jobRole, department, address,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const result = await fetchBot(endPoints.signUp, fetchConfig)

            const { message, token } = result.data;
            this.setState({
                isSaving: false,
                message,
                error: null,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                gender: '',
                jobRole: '',
                department: '',
                address: '',
            });

            if (!isLoggedIn) {
                localStorage.setItem(storageId, JSON.stringify({ token, firstName }));
                window.location = '/feed';
            }
        } catch (e) {
            this.setState({ isSaving: false, error: e.message || e.error.message })
        }
    }

    render() {
        const {
            firstName, lastName, email, password, jobRole, department, address,
            isRequesting, isSaving, message, error, jobRoles, departments,
        } = this.state;

        const jobRolesMap = jobRoles && jobRoles.map((role) => <option key={Math.random()} value={role.name}>{role.name}</option>);
        const departmentsMap = departments && departments.map((departmenti) => (
            <option key={Math.random()} value={departmenti.name}>
                {departmenti.name}
            </option>
        ));

        return (
            <>
                {message && <span className="message success">{message}</span>}
                {error && <span className="message error">{error}</span>}

                <form>
                    <div className="form-group">
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={this.handleChange}
                                disabled={isRequesting}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={this.handleChange}
                                disabled={isRequesting}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Email Address:
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                                disabled={isRequesting}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                disabled={isRequesting}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        Gender:
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                onChange={this.handleChange}
                                maxLength="6"
                                disabled={isRequesting}
                                defaultChecked
                            />
                            {' '}
                            Male
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                onChange={this.handleChange}
                                maxLength="6"
                                disabled={isRequesting}
                            />
                            {' '}
                            Female
                        </label>
                        <br />
                        <br />
                    </div>
                    <div className="form-group">
                        <label>
                            Job Role:
                            <select name="jobRole" value={jobRole} onChange={this.handleChange} disabled={isRequesting} required>
                                {jobRolesMap}
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Department:
                            <select name="department" value={department} onChange={this.handleChange} disabled={isRequesting} required>
                                {departmentsMap}
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Address:
                            <textarea name="address" value={address} onChange={this.handleChange} disabled={isRequesting} required />
                        </label>
                    </div>

                    <div className="form-group">
                        <button type="submit" onClick={this.handleSubmit} disabled={isRequesting}>
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </>
        );
    }
}
