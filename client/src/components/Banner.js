import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useStateContext } from "../context";

export const Banner = () => {
  const { address, connect } = useStateContext();

  const handleClick = () => {
    if (address) { alert("wallet connected") }
    else { connect() }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Send gETH Universally</span>
                <h1>Buy, Send and Transfer Cryptocurrency easily.</h1>
                <button onClick={handleClick}>Connect Wallet<ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn wallet_address" : "wallet_address"}>
                  <div className="wallet_address__card">
                    
                    <img src="https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDYvNGE4NmNmOWQtODM2Mi00YmVhLThiMzctZDEyODAxNjUxZTE1LmpwZWc=.jpg"
                     alt="NFT Art" className="h-60 w-full object-cover" />
                    <h3>Address :{address.slice(0, 7) + '...' + address.slice(38)}</h3>
                  </div>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
