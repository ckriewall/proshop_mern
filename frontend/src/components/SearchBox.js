/*
  The search box doesn't execute a search. Rather,
  it redirects the browser to the HomeScreen Component. 
  In HomeScreen the default product list  is filtered 
  based on keywords pulled from the querystring.
*/

import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-secondary' className='py-2 px-3'>
        <i className='fa fa-search' />
      </Button>
    </Form>
  )
}

export default SearchBox