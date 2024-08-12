import React from 'react'
import {Navigate} from 'react-router-dom'
import { getToken } from '../auth'

function ProtectedRoute({element:Component}) {
    const token=getToken()
  return token? (
  <Component/>
  ):(
    <Navigate to="/login"/>
  )
}

export default ProtectedRoute
