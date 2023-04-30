import { Container, Row, Col } from "react-bootstrap";
import imgUrl from "../assets/img/header-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useStateContext } from "../context";
import { useEffect, useState } from "react";

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, amount }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="txn-imgbx">
        <img src={imgUrl} alt="transactions view"/>
        <div className="txn-txtx">
          <h4>From: {addressFrom.slice(0, 7) + '...' + addressFrom.slice(38)}</h4>
          <h4>To: {addressTo.slice(0, 7) + '...' + addressTo.slice(38)}</h4>
          <span>Amount: {amount} gETH</span>
          <span>||</span>
          <span>Timestamp: {timestamp}</span>
          <span>||</span>
          <span>Message: {message}</span>
        </div>
      </div>
    </Col>
  )
}

export const Transactions = () => {
  const { address, getAllTransactions } = useStateContext();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getTransactions() {
      const txn = await getAllTransactions()
      setTransactions(txn)
    }
    if (address) { getTransactions() };
  }, [address, getAllTransactions]);

  return (
    <section className="transactions" id="transactions">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Transactions</h2>
                <p>Connect your wallet to load transactions. <b>CLICK</b> or <b>HOVER</b> to view</p>
                <Row>
                  {
                    transactions.map((txn, index) => {
                      return (
                        <TransactionCard
                          key={index}
                          {...txn}
                          />
                      )
                    })
                  }
                </Row>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      {/* <img className="background-image-right" src={colorSharp2}></img> */}
    </section>
  )
}
