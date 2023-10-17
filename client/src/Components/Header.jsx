import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-cyan-600 p-4 flex justify-between items-center">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <img
          src="https://icons.veryicon.com/png/o/system/academic-background-icon/product-management-5.png"
          alt="Logo"
          className="h-8 w-8 mr-2"
        />
        <span className="text-white text-lg font-semibold">Product Management</span>
      </div>

      {/* Mobile Menu Toggle Button (with Toggle/Close functionality) */}
      <div className="lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-white hover:text-green-100 focus:outline-none"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu (Visible on Mobile) */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4">
          {/* Mobile Menu Dropdown */}
          <div className="relative">
            <ul className="absolute top-8 right-0 w-32 bg-white rounded-md shadow-lg mt-2 p-2">
              <li>
                <a href="#" className="text-gray-800 hover:text-green-100">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-800 hover:text-green-100">Add Products</a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Desktop Navigation Links (Visible on Desktop) */}
      <div className="hidden lg:flex space-x-4">
        <button onClick={()=>navigate('/')} className="text-white hover:text-green-100">
          Home
        </button>
        <button onClick={()=>navigate('/addProduct')} className="text-white hover:text-green-100">
          Add Product
        </button>
      </div>
    </nav>
  );
}

export default Header;
