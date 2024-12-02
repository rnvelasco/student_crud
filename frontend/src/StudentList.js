import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class StudentList extends Component {

    constructor(props) {
        super(props);
        this.state = { students: [] };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/students')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ students: data });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }    

    async remove(id) {
        await fetch(`/students/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedStudents = [...this.state.students].filter(i => i.id !== id);
            this.setState({ students: updatedStudents });
        });
    }

    render() {
        const { students } = this.state;

        const studentList = students.map(student => {
            return <tr key={student.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.course}</td>
                <td>{student.studentNumber}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={`/students/${student.id}`}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(student.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/students/new">Add Student</Button>
                    </div>
                    <h3>Students</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="30%">First Name</th>
                                <th width="30%">Last Name</th>
                                <th width="30%">Course</th>
                                <th width="30%">Student Number</th>
                                <th width="10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default StudentList;
