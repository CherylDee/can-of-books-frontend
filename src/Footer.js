import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './styles.css';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand> &copy; 2023 Mo-Che DBA @ Code Fellows</Navbar.Brand>
      </Navbar>
    )
  }
}


export default Footer;
