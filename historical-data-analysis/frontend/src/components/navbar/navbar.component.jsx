import React from 'react';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';



const NavBar = ({getNewData, availableCountry}) => {

  const years = Array.from({ length: new Date().getFullYear() - 2009 }, (_, index) => 2010 + index);
  const countries = availableCountry

  const [selectedYear, setSelectedYear] = useState(2010);
  const [selectedCountry1, setSelectedCountry1] = useState('Mexico');
  const [selectedCountry2, setSelectedCountry2] = useState('Sweden');

  const handleSelectChange = (eventKey) => {
    setSelectedYear(eventKey);
  };

  const handleSelectCountry1 = (eventKey) => {
    setSelectedCountry1(eventKey);
  };

  const handleSelectCountry2 = (eventKey) => {
    setSelectedCountry2(eventKey);
  };

  const countriesForDropdown1 = countries.filter((country) => country !== selectedCountry2);
  const countriesForDropdown2 = countries.filter((country) => country !== selectedCountry1);



  return (
    <Navbar expand="md" className="bg-body-tertiary" data-bs-theme="dark" style={{fontFamily: 'monospace'}}>
      <Container>
        <Navbar.Brand href="#home">Data Comparison Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav>
            <NavDropdown title={selectedYear} onSelect={handleSelectChange} id="basic-nav-dropdown">
            {years.map((year, index) => (
                <NavDropdown.Item key={index} eventKey={year} >
                  {year}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title={selectedCountry1} id="basic-nav-dropdown" onSelect={handleSelectCountry1}>
            {countriesForDropdown1.map((country, index) => (
                <NavDropdown.Item key={index} eventKey={country}>
                  {country}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title={selectedCountry2} id="basic-nav-dropdown" onSelect={handleSelectCountry2}>
            {countriesForDropdown2.map((country, index) => (
                <NavDropdown.Item key={index} eventKey={country}>
                  {country}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Button 
            variant="success" 
            style={{marginLeft: '10px', fontFamily: 'monospace'}}
            onClick={() => {
              getNewData(selectedCountry1, selectedCountry2, selectedYear);
            }}
            >
              Compare</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;