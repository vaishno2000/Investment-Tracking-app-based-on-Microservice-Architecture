import React, { useEffect } from 'react'
import { Route,Routes,useNavigate  } from 'react-router-dom'

const PrivateRoute = ({ element: Component }) => {
  const navigate=useNavigate();
    useEffect(()=>{
      let id=sessionStorage.getItem('userId');
      if(!id){
        navigate('/login');
      }
    },[])

  return (
    <Component />
  )
}

export default PrivateRoute
