import React from 'react'
import './navbar.scss'

const Navbar = () => {

    const [open, setOpen] = React.useState(false)
    return (
        <nav>
            <div className='left'>
                <a href='/' className='logo'>
                    <img src='/logo.png' alt='logo' />
                    <span>EstateEase</span>
                </a>
                <a href='/'>Home</a>
                <a href='/'>About</a>
                <a href='/'>Contact</a>
                <a href='/'>Agents</a>
            </div>
            <div className='right'>
                <a href='/'>sign in</a>
                <a className='register' href='/'>sign up</a>
                <div className='menuIcon'>
                    <img
                        src='/menu.png'
                        alt='menu'
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className={open ? "menu active" : "menu"}>
                    <a href='/'>About</a>
                    <a href='/'>Contact</a>
                    <a href='/'>Agents</a>
                    <a href='/'>sign in</a>
                    <a href='/'>sign up</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
