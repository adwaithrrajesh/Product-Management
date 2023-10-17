import React from 'react'
import { useState } from 'react'
import Header from '../../Components/Header'
import Cards from '../../Components/Cards'
import Pagination from '../../Components/Pagination'

function ProductView() {

  const [products, setProducts] = useState([]); 
  const [refresh,setRefresh] = useState(false)

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  const doRefresh = () =>{
    setRefresh(!refresh)
  }

  return (
    <>
    <Header/>
    <Cards products={products} doRefresh={doRefresh}/>
    <Pagination updateProducts={updateProducts} refresh={refresh}/>
    </>
  )
}

export default ProductView