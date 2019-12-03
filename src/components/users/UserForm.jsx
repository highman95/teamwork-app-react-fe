import React from 'react';
import endPoints from '../../constants/endpoints';
import { storageId, isLoggedIn } from '../../constants/helpers';

export function CreateUserAccount() {
    return (
        <>
            <h3>Register User Account</h3>
            <hr />
            <UserForm />
        </>
    );
}

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
    }

    componentDidMount() {
        this.populateFields();
    }

    async populateFields() {
        this.setState({ isRequesting: true });
        const fetchConfig = {
            mode: 'cors',
        };

        await fetch(endPoints.roles, fetchConfig).then(resp => resp.json()).then(result => {
            fetch(endPoints.departments, fetchConfig).then(resp => resp.json()).then(result_2 => {
                const jobRoles = result.data;
                const departments = result_2.data;

                this.setState({ isRequesting: false, jobRole: jobRoles[0].name, jobRoles, department: departments[0].name, departments });
            }).catch((e) => this.setState({ error: e.message || e.error.message, isRequesting: false }));
        }).catch((e) => this.setState({ error: e.message || e.error.message, isRequesting: false }));
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { firstName, lastName, email, password, gender, jobRole, department, address } = this.state;
        this.addUser(firstName, lastName, email, password, gender, jobRole, department, address);
    }

    async addUser(firstName, lastName, email, password, gender, jobRole, department, address) {
        this.setState({ isRequesting: true, message: null });
        const fetchConfig = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ firstName, lastName, email, password, gender, jobRole, department, address }),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        await fetch(endPoints.signUp, fetchConfig).then(resp => resp.json()).then(result => {
            if (result.status === 'error') {
                throw new Error(result.error);
            }

            const { message, token, firstName } = result.data;
            this.setState({ isRequesting: false, message, error: null, firstName: '', lastName: '', email: '', password: '', gender: '', jobRole: '', department: '', address: '' });

            if (!isLoggedIn) {
                localStorage.setItem(storageId, JSON.stringify({ token, firstName }));
                window.location = '/feed';
            }
        }).catch((e) => this.setState({ isRequesting: false, error: e.message || e.error.message }));
    }

    render() {
        const {
            firstName, lastName, email, password, jobRole, department, address,
            isRequesting, message, error, jobRoles, departments,
        } = this.state;

        const jobRolesMap = jobRoles && jobRoles.map(role => <option key={Math.random()} value={role.id}>{role.name}</option>)
        const departmentsMap = departments && departments.map(department => <option key={Math.random()} value={department.id}>{department.name}</option>)

        return (
            <>
                {message && <span className="message success">{message}</span>}
                {error && <span className="message error">{error}</span>}

                <form>
                    <div className="form-group">
                        <label>
                            First Name:
                            <input type="text" name="firstName" value={firstName} onChange={this.handleChange} disabled={isRequesting} required />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Last Name:
                            <input type="text" name="lastName" value={lastName} onChange={this.handleChange} disabled={isRequesting} required />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Email Address:
                            <input type="email" name="email" value={email} onChange={this.handleChange} disabled={isRequesting} required />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Password:
                            <input type="password" name="password" value={password} onChange={this.handleChange} disabled={isRequesting} required />
                        </label>
                    </div>
                    <div className="form-group">
                        Gender:<br />
                        <label>
                            <input type="radio" name="gender" value="male" onChange={this.handleChange} maxLength="6" disabled={isRequesting} defaultChecked /> Male
                        </label>
                        <br />
                        <label>
                            <input type="radio" name="gender" value="female" onChange={this.handleChange} maxLength="6" disabled={isRequesting} /> Female
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
                            {isRequesting ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </>
        );
    }
}
