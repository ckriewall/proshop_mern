import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  // Add item to cartItems in Redux state.
  // Overwrite the cartItems in local storage with cartItems in Redux state.
  // In store.js, default Redux state for cartItems is filled from local storage.
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  // Remove item from cartItems in Redux state.
  // Overwrite the cartItems in local storage with cartItems in Redux state.
  // In store.js, default Redux state for cartItems is filled from local storage.
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  // Save the shipping address to redux and local storage.
  // In store.js, default Redux state for shippingAddress is filled from local storage.
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}
export const savePaymentMethod = (data) => (dispatch) => {
  // Save the payment method to redux and local storage.
  // In store.js, default Redux state for paymentMethod is filled from local storage.
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
