import React from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({id,children}) => {
    const navigate=useNavigate();
    if(!id){
        navigate('/login');
    }
  return (
    children
  )
}

export default Protected
