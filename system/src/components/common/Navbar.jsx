import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-indigo-600" aria-label="DoctorApp Home">
            DoctorApp
          </Link>
          
          <div className="hidden md:flex space-x-4 sm:space-x-6" role="menubar">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1" role="menuitem">
              Home
            </Link>
            <Link to="/doctors" className="text-gray-700 hover:text-indigo-600 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1" role="menuitem">
              Doctors
            </Link>
            <Link to="/book-appointment" className="text-gray-700 hover:text-indigo-600 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1" role="menuitem">
              Book Appointment
            </Link>
            <Link to="/my-account" className="text-gray-700 hover:text-indigo-600 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1" role="menuitem">
              My Account
            </Link>
          </div>

          <div className="hidden md:flex space-x-3 sm:space-x-4" role="menubar">
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1"
              role="menuitem"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              role="menuitem"
            >
              Register
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden pb-4" role="menu">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/doctors"
                className="text-gray-700 hover:text-indigo-600 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Doctors
              </Link>
              <Link
                to="/book-appointment"
                className="text-gray-700 hover:text-indigo-600 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Book Appointment
              </Link>
              <Link
                to="/my-account"
                className="text-gray-700 hover:text-indigo-600 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                My Account
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
