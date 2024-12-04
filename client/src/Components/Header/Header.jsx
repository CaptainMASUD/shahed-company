import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaHome, FaUserAlt, FaServicestack, FaPhoneAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Dropdown } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../App/EmployeeSlice/employeeSlice'; // Import logout action
import { IoEnter } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve the currentUser from the employee state in Redux
  const { currentUser } = useSelector((state) => state.employee || { currentUser: null });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Effect to clear the user and persisted state on logout
  useEffect(() => {
    if (!currentUser) {
      // Clear persisted state from localStorage when the user is logged out
      localStorage.removeItem('persist:root');
    }
  }, [currentUser]);

  const handleLogout = () => {
    // Dispatch the logout action to clear the currentUser in the Redux state
    dispatch(logout());
    // Navigate to the home page or login page after logout
    navigate('/'); 
  };

  return (
    <nav className="bg-teal-600 text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="font-bold text-xl">Shahed Company Limited</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? "bg-teal-800 hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium" : "hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                <FaHome className="mr-2 inline" />
                Home
              </NavLink>
              <NavLink 
                to="/aboutus" 
                className={({ isActive }) => 
                  isActive ? "bg-teal-800 hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium" : "hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                <FaUserAlt className="mr-2 inline" />
                About
              </NavLink>
              <NavLink 
                to="/services" 
                className={({ isActive }) => 
                  isActive ? "bg-teal-800 hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium" : "hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                <FaServicestack className="mr-2 inline" />
                Services
              </NavLink>
              <NavLink 
                to="/contactus" 
                className={({ isActive }) => 
                  isActive ? "bg-teal-800 hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium" : "hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                <FaPhoneAlt className="mr-2 inline" />
                Contact
              </NavLink>
            </div>
            {/* Profile or Sign In Button */}
            {currentUser ? (
              <div className="ml-auto">
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={(
                    <Avatar
                      alt="user"
                      img={currentUser.profilePicture}
                      rounded
                      size="sm"
                    />
                  )}
                  className="ml-auto"
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{currentUser.username}</span>
                    <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                  </Dropdown.Header>

                  {/* Conditional rendering based on isEmployee and isAdmin */}
                  {currentUser.isAdmin ? (
                    <Link to="/admin">
                      <Dropdown.Item>
                        <FaUserAlt className="mr-2" />
                        Admin Dashboard
                      </Dropdown.Item>
                    </Link>
                  ) : null}

                  {currentUser.isEmployee ? (
                    <Link to="/emplyeeDashboard">
                      <Dropdown.Item>
                        <FaUserAlt className="mr-2" />
                        Employee Dashboard
                      </Dropdown.Item>
                    </Link>
                  ) : null}

                  <Link to="/profile">
                    <Dropdown.Item>
                      <FaUserAlt className="mr-2" />
                      Profile
                    </Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="mr-2" />
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </div>
            ) : (
              <Link to="/login">
                <button className='bg-gray-200 text-teal-500 w-20 flex p-[6px] font-semibold rounded-md hover:bg-gray-300 '>
                  <IoEnter className='w-5 h-5 mr-1 mt-1'/> Login
                </button>
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) => 
                isActive ? "bg-teal-800 hover:bg-teal-700 px-3 py-2 rounded-md text-base font-medium" : "hover:bg-teal-700 px-3 py-2 rounded-md text-base font-medium"
              }
            >
              <FaHome className="mr-2 inline" />
              Home
            </NavLink>
            <NavLink
              to="/aboutus"
              className={({ isActive }) => 
                isActive ? "bg-teal-800 hover:bg-teal-700 px-3 py-2 rounded-md text-base font-medium" : "hover:bg-teal-700 px-3 py-2 rounded-md text-base font-medium"
              }
            >
              <FaUserAlt className="mr-2 inline" />
              About
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) => 
                isActive ? "bg-teal-800 hover:bg-teal-700 px-3 py-2 rounded-md text-base font-medium" : "hover:bg-teal-700 px-3 py-2 rounded-md text-base font-medium"
              }
            >
              <FaServicestack className="mr-2 inline" />
              Services
            </NavLink>
            <NavLink
              to="/contactus"
              className={({ isActive }) => 
                isActive ? "bg-teal-800 hover:bg-teal-700 px-3 py-2 rounded-md text-base font-medium" : "hover:bg-teal-700 px-3 py-2 rounded-md text-base font-medium"
              }
            >
              <FaPhoneAlt className="mr-2 inline" />
              Contact
            </NavLink>

            {/* Conditional rendering based on isEmployee and isAdmin for mobile */}
            {currentUser ? (
              <>
                {currentUser.isAdmin && (
                  <Link to="/admin">
                    <Dropdown.Item>
                      <FaUserAlt className="mr-2" />
                      Admin Dashboard
                    </Dropdown.Item>
                  </Link>
                )}
                {currentUser.isEmployee && (
                  <Link to="/emplyeeDashboard">
                    <Dropdown.Item>
                      <FaUserAlt className="mr-2" />
                      Employee Dashboard
                    </Dropdown.Item>
                  </Link>
                )}
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="mr-2" />
                  Sign out
                </Dropdown.Item>
              </>
            ) : (
              <Link to="/sign-up">
                <Button gradientDuoTone="purpleToBlue" outline>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
