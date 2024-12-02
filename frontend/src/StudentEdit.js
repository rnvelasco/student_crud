import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { withRouter } from 'react-router-dom';

class StudentEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                firstName: '',
                lastName: '',
                course: '',
                studentNumber: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        if (id !== 'new') {
            try {
                const response = await fetch(`/students/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch student');
                }
                const student = await response.json();
                this.setState({ item: student });
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            item: {
                ...prevState.item,
                [name]: value
            }
        }));
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;
        const method = item.id ? 'PUT' : 'POST';
        try {
            const response = await fetch(`/students${item.id ? '/' + item.id : ''}`, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            if (!response.ok) {
                throw new Error('Failed to save student');
            }
            this.props.history.push('/students');
        } catch (error) {
            console.error('Error saving student:', error);
        }
    }

    render() {
        const { item } = this.state;
        const title = <h2>{item.id ? 'Edit Student' : 'Add Student'}</h2>;

        return (
            <div>
                <AppNavbar />
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={item.firstName}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={item.lastName}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="course">Course</Label>
                            <Input
                                type="text"
                                name="course"
                                id="course"
                                value={item.course}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="studentNumber">Student Number</Label>
                            <Input
                                type="text"
                                name="studentNumber"
                                id="studentNumber"
                                value={item.studentNumber}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" onClick={() => this.props.history.push('/students')}>Cancel</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withRouter(StudentEdit);