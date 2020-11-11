import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import OrderSummary from '../components/OrderSummary'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <h1>Payment</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='method'>
              <Form.Label as='legend'>Select Method</Form.Label>
              <Col>
                <Form.Check
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
              </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Continue
            </Button>
          </Form>
        </Col>
        <OrderSummary />
      </Row>
    </FormContainer>
  )
}

export default PaymentScreen
