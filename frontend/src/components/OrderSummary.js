import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const OrderSummary = ({ match }) => {
  const { pathname } = useLocation()

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

  const placeOrderHandler = () => {
    console.log('Place Order')
  }

  return (
    <Fragment>
      <Col md={4}>
        <Card className='mt-3'>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col className='text-right'>${cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col className='text-right'>${cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax @ 15%</Col>
                <Col className='text-right'>${cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col className='text-right'>${cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {pathname === '/placeorder' && (
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Fragment>
  )
}

export default OrderSummary
