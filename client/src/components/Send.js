import { useState } from "react";
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import { Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useStateContext } from '../context';

export const Send = () => {
  const formInitialDetails = {
    address: '',
    amount: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});
  const { sendCrypto, address } = useStateContext();

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address) {
      setButtonText("Sending...");
      await sendCrypto(formDetails)
      setButtonText("Send");
      setFormDetails(formInitialDetails);
      setStatus({'success': true});
    } else {
      alert("connect wallet")
    }
  };

  return (
    <section className="send" id="send">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="send-bx wow zoomIn">
                        <h2>Send Crypto</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br></br> Lorem Ipsum has been the industry's standard dummy text.</p>
                        
                        <Col size={12} md={12}>
                          <TrackVisibility>
                            {({ isVisible }) =>
                              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                              <form onSubmit={handleSubmit}>
                                <Row>
                                  <Col size={12} sm={12} className="px-1">
                                    <input type="text" value={formDetails.address} placeholder="Receiver's Address" onChange={(e) => onFormUpdate('address', e.target.value)} />
                                  </Col>
                                  <Col size={12} sm={12} className="px-1">
                                    <input type="text" value={formDetails.amount} placeholder="Amount (gETH)" onChange={(e) => onFormUpdate('amount', e.target.value)}/>
                                  </Col>
                                  <Col size={12} sm={12} className="px-1">
                                    <input type="text" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}/>
                                  </Col>
                                  <Col size={12} className="px-1">
                                    <button type="submit"><span>{buttonText}</span></button>
                                  </Col>

                                  {
                                    status.message &&
                                    <Col>
                                      <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                    </Col>
                                  }
                                </Row>
                              </form>
                            </div>}
                          </TrackVisibility>
                        </Col>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
