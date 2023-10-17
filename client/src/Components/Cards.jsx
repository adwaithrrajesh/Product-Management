import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteProduct } from '../API/ProductAPi';
import toast from 'react-hot-toast';

function Cards({ products,doRefresh }) {
  const [productDetails, setProductDetails] = useState(products);
  const navigate = useNavigate()
  useEffect(()=>{
    if(products){
      setProductDetails(products)
    }
  },[products])

  const descriptionMaxLength = 100;

  const toggleDescription = (index) => {
    const updatedProductDetails = [...productDetails];
    updatedProductDetails[index].showFullDescription = !updatedProductDetails[index].showFullDescription;
    setProductDetails(updatedProductDetails);
  };


  const showDeleteConfirmation = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this product. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(async(result) => {
      if (result.isConfirmed) {
        const doDeletion = await deleteProduct(productId)
        doRefresh()
        if(doDeletion) return toast.success(doDeletion.data.message)
      }
    });
  };



  return (

    <>
    {productDetails.length >0 ?
      <>
       <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {productDetails.map((product, index) => (
          <div
            key={product._id}
            className="my-1 px-1 w-full md:w-1/2 sm:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 cursor-pointer hover:scale-105 ease-in-out duration-200"
          >
            <article className="overflow-hidden relative rounded-lg shadow-lg bg-white hover:bg-blue-50 h-[auto]">
              <div className="text-red-400 absolute top-2 right-2 cursor-pointer hover:text-red-600">
                <FontAwesomeIcon icon={faTrash} onClick={() => showDeleteConfirmation(product._id)} size="lg" />
              </div>


              <div className="flex items-center justify-center leading-tight p-2 md:p-4">
                <img
                  alt="Placeholder"
                  className="block h-48 w-48 object-cover"
                  src={product.images[0]}
                />
              </div>

              <header className="flex items-center justify-center leading-tight">
                <h1 className="text-lg">
                  <p className="no-underline text-black">{product.name}</p>
                </h1>
              </header>

              <header className="flex items-center justify-center leading-tight mt-2">
                <div className="text-gray-500">
                  {product.showFullDescription
                    ? product.description
                    : product.description.substring(0, descriptionMaxLength)}
                  {product.description.length > descriptionMaxLength && (
                    <button
                      className="text-blue-500 hover:text-blue-700 ml-2 focus:outline-none"
                      onClick={() => toggleDescription(index)}
                    >
                      {product.showFullDescription ? 'Show Less' : 'View More'}
                    </button>
                  )}
                </div>
              </header>

              <div className="flex items-center justify-center leading-tight mt-2">
                <p className="text-green-500 text-center">Price: ₹{product.price}</p>
              </div>

              <div className="flex items-center justify-center leading-tight p-2 md:p-4" onClick={()=>navigate('/viewProduct',{state:product})}>
                <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover-bg-cyan-700 dark:focus-ring-cyan-800">
                  View Product
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </p>
              </div>

            </article>
          </div>
        ))}
      </div>
    </div>
      </>

      :
      <div class="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer ">
      <article class="overflow-hidden rounded-lg shadow-lg bg-white h-[auto]">
        <div className="flex items-center justify-center leading-tight p-2 md:p-4">
          <a>
            <img
              alt="Placeholder"
              class="block h-96 w-full rounded-full object-cover"
              src="https://cdni.iconscout.com/illustration/premium/thumb/folder-is-empty-4064360-3363921.png"
            />
          </a>
        </div>

        <header class="flex items-center justify-center leading-tight">

        <button onClick={()=>navigate('/addProduct')} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-1/5" >
            Add Product
          </button>

        </header>

        <div class="flex items-center justify-center  text-gray-500 text-center leading-tight p-2 md:p-4">
          <p>Unable to find a Products for you</p>
        </div>
      </article>
    </div>
    }
    </>
  );
}

export default Cards;
