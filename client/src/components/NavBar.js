import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import { useStateContext } from '../context';
import {
  BrowserRouter as Router
} from "react-router-dom";

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { connect, address } = useStateContext();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const handleClick = () => {
    connect()
  }

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#send" className={activeLink === 'send' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('send')}>Send</Nav.Link>
              <Nav.Link href="#transactions" className={activeLink === 'transactions' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('transactions')}>Transactions</Nav.Link>
              <Nav.Link href="https://agba-d.vercel.app" target="_blank" className={ 'navbar-link' }>Hire Me</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <button className="vvd" onClick={handleClick}><span>{address ? 'Connected' : 'Connect'}</span></button>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
