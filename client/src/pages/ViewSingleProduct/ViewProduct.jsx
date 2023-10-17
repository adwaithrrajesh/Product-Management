import React from 'react'
import Header from '../../Components/Header'
import ShowProductDetails from '../../Components/ShowProductDetails'
import { useLocation } from 'react-router-dom'

function ViewProduct() {
  const location = useLocation()
  const product = location.state
  return (
    <>
    <Header />
    <ShowProductDetails product={product}/>
    </>
  )
}

export default ViewProduct