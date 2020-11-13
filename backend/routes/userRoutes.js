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
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
