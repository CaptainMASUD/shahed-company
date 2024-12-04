import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../Header/Header'
import Footer from '../Footer/Footer'






function Layout() {
  return (
    <>
  <Navbar/>
  <Outlet/>
  <Footer/>
    </>
  )
}

export default Layout
