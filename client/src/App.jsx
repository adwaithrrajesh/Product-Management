import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductView from './pages/ProductList/Index'
import AddProduct from './pages/AddProduct'
import ViewProduct from './pages/ViewSingleProduct/ViewProduct'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<ProductView/>}/>
    <Route path='/addProduct' element={<AddProduct/>}/>
    <Route path='/viewProduct' element={<ViewProduct/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
