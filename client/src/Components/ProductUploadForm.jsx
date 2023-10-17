import React, { useState } from 'react';
import { addProduct, uploadToCDN } from '../API/ProductAPi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const ProductUploadForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    images: [],
    price: '', // Add a price field
  });


  const navigate = useNavigate()
  const [inputErrors, setInputErrors] = useState({});
  const [imageError, setImageError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setInputErrors({ ...inputErrors, [name]: '' });
  };

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    if (images.length !== 4) {
      setImageError('Please select only 4 images.');
    } else {
      // Validate the image file types
      const invalidImageTypes = images.filter((image) => !image.type.startsWith('image/'));
      if (invalidImageTypes.length > 0) {
        setImageError('Invalid image file type. Please select only image files.');
      } else {
        setProduct({ ...product, images });
        setImageError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform input validation
    const errors = {};
    if (product.name.trim() === '') {
      errors.name = 'Product name is required';
    }
    if (product.description.trim() === '') {
      errors.description = 'Product description is required';
    }
    if (product.price.trim() === '') {
      errors.price = 'Product price is required';
    } else if (!/^\d+(\.\d{1,2})?$/.test(product.price)) {
      errors.price = 'Invalid price format.';
    }

    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    if (product.images.length !== 4) {
      setImageError('Please select 4 images.');
      return;
    }

    const imageUrl = await uploadToCDN(product.images);
    product.images = imageUrl;
    const addProductToServer = await addProduct(product);
    if(addProductToServer) toast.success('product Added Successfully')
    navigate('/')
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full bg-cyan-50">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Upload a Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={product.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-lg border-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
            {inputErrors.name && <p className="text-red-500">{inputErrors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Product Description
            </label>
            <textarea
              name="description"
              id="description"
              value={product.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full h-32 border rounded-lg border-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
            {inputErrors.description && <p className="text-red-500">{inputErrors.description}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Product Price
            </label>
            <input
              type="text" // Use text input to avoid spinner
              name="price"
              id="price"
              value={product.price}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-lg border-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
            {inputErrors.price && <p className="text-red-500">{inputErrors.price}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Select Product Images (up to 4)
            </label>
            <label className="block mt-2 text-blue-500 cursor-pointer hover:underline">
              Choose File
              <input
                type="file"
                name="images"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {imageError && <p className="text-red-500">{imageError}</p>}
          </div>
          {product.images.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Selected Images</h2>
              <div className="mt-2 flex flex-wrap">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index}`}
                    className="w-20 h-20 object-cover rounded-lg m-1"
                  />
                ))}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUploadForm;
