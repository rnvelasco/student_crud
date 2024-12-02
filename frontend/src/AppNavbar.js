import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarText } from 'reactstrap';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
                <div className="d-flex justify-content-end w-100">
                    <NavbarText>C-PCIT9 - SYSTEMS INTEGRATION AND ARCHITECTURE</NavbarText>
                </div>
            </Navbar>
        );
    }
} 