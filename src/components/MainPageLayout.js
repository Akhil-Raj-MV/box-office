import React from 'react'
import Navbar from './Navs'
import Title from './Title'


export const MainPageLayout = ({children}) => {
  return (
    <div>

        <Title title="BOX OFFICE" subtitle="Are you looking for a movie or an actor?"  />
        <Navbar/>
        {children}
    </div>
  )
}
