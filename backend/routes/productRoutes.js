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
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
