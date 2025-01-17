import Footer from '@/components/Footer'
import FooterOne from '@/components/Footer/FooterOne'
import FooterTwo from '@/components/Footer/FooterTwo'
import Header from '@/components/Header'
import HeaderThree from '@/components/Header/HeaderThree'
import HeaderTwo from '@/components/Header/HeaderTwo'
import React from 'react'

const Layout = ({children}) => {
  return (
    <>
    <HeaderTwo />
    <HeaderThree />
    {children}
    <FooterTwo />
    <FooterOne />
    </>
  )
}

export default Layout
