import React, { useState } from 'react';

function ShowProductDetails(props) {
  const { product } = props;
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? product.images.length - 1 : prevImage - 1
    );
  };

  return (

    <div className="flex items-center justify-center h-screen">
    <div className="my-1 px-1 w-full md:w-1/2 sm:w-1/2 lg:my-4 lg:px-4 lg:w-full cursor-pointer">
      <article className="overflow-hidden rounded-lg shadow-lg bg-white h-[auto]">
      <div className="relative">
          <button
            onClick={prevImage}
            className="bg-white rounded-full p-2 shadow-lg cursor-pointer absolute top-1/2 left-0 transform -translate-y-1/2"
          >
            {/* Icon for previous image */}
            &#9664;
          </button>
          <button
            onClick={nextImage}
            className="bg-white rounded-full p-2 shadow-lg cursor-pointer absolute top-1/2 right-0 transform -translate-y-1/2"
          >
            {/* Icon for next image */}
            &#9654;
          </button>
          <div className="flex items-center justify-center">
            <a>
              <img
                alt="Placeholder"
                className="block h-96 rounded-lg object-cover"
                src={product.images[currentImage]}
              />
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center leading-tight">
          <h1 className="text-lg">
            <p className="no-underline text-4xl text-black">{product.name}</p>
          </h1>
        </div>

        <div className="flex items-center justify-center text-gray-500 text-center leading-tight p-2 md:p-4">
          <p>{product.description}</p>
        </div>

        <div className="flex items-center justify-center text-gray-500 text-center leading-tight p-2 md:p-4">
          <p>₹{product.price}</p>
        </div>
      </article>
    </div>
  </div>
  );
}

export default ShowProductDetails;
