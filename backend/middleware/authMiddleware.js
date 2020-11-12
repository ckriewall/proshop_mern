import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  // protected routes require a valid token
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Tokens are sent in the string 'Bearer ####'.
      // Split the string at the space, creating an array
      // containing [Bearer, ####]. The second item in the
      // array is the token value.
      token = req.headers.authorization.split(' ')[1]

      // decode the token using the secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // match a user in the db to the decoded user id
      req.user = await User.findById(decoded.id).select('-password')

      // user token is vaild. move to the next step in the middleware chain
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized. Admin access only.')
  }
}

export { protect, admin }
