import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header className='flex items-center justify-center gap-2 text-sky-600 border-[.5px] border-b-[#d8d8d8] h-[55px] absolute top-0 left-0 w-full'>
            <NavLink to={"/"} className='header_nav_link text-[15px] border-b border-transparent hover:border-[#d8d8d8] pb-1'>Home</NavLink>
            <NavLink to={"react-query"} className='header_nav_link text-[15px] border-b border-transparent hover:border-[#d8d8d8] pb-1'>ReactQuery</NavLink>
        </header>
    )
}

export default Header