/*
    Routes match URL patterns with JS functions to handle them.
    https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
    API data flow: routes -> controllers -> models -> database

    The middleware functions protect and admin are imported for additional security.
     - admin: restricts access to admin users
     - protect: restricts access to authenticated users

    Chainable route handlers (route('/').get(function1).post(function2))
    for each route path reduce redundancy and typos.
*/

import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
