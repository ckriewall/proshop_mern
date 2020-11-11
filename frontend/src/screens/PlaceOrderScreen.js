import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import OrderSummary from '../components/OrderSummary'
import Message from '../components/Message'

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart)

  // Calculate Prices

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cart.shippingPrice =
    cart.itemsPrice > 100 ? Number(0).toFixed(2) : Number(100).toFixed(2)
  cart.taxPrice = (0.15 * cart.itemsPrice).toFixed(2)
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
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
