import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Maia K',
    email: 'maia@kriewall.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Nick K',
    email: 'nick@kriewall.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
]

export default users
