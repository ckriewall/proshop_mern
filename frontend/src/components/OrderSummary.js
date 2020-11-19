import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const OrderSummary = ({ match }) => {
  const { pathname } = useLocation()

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  // Calculate Prices

  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 25
  cart.taxPrice = 0.15 * cart.itemsPrice
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
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
                <Col className='text-right'>
                  {currency.format(cart.itemsPrice)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col className='text-right'>
                  {currency.format(cart.shippingPrice)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax @ 15%</Col>
                <Col className='text-right'>
                  {currency.format(cart.taxPrice)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col className='text-right'>
                  {currency.format(cart.totalPrice)}
                </Col>
              </Row>
            </ListGroup.Item>
            {error && <Message variant='warning'>{error}</Message>}
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
