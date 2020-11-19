import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Row, Col, ListGroup } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import OrderSummary from '../components/OrderSummary'
import Message from '../components/Message'

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      {error && <Message variant='warning'>{error}</Message>}
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h1>Place Order</h1>
              <h2>Shipping</h2>
              <p>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode} {cart.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty.</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col>
                          <Link to={`product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <OrderSummary />
      </Row>
    </div>
  )
}

export default PlaceOrderScreen
