import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Homer J',
    email: 'homer@simpson.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Marge B',
    email: 'marge@simpson.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
]

export default users
