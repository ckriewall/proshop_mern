/*
    Multer's diskStorage() function takes in an object containing two functions. 
    The first function creates the destination directory. 
    The second function customizes the filename.

    The destination() function takes in request, file, and callback.
    Next we call the callback to specify the target directory.
    null is passed into the callback because there is no error. 

    The filename() function takes in request, file and callback. 
    Next we call the callback to customize the filename.
    null is passed into the callback because there is no error. 
*/

import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
