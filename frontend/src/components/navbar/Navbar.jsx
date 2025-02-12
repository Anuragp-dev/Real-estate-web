import React, { useContext } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {

    const [open, setOpen] = React.useState(false)

    const {currentUser} = useContext(AuthContext); 
    console.log('currentUser: ', currentUser);
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
                {currentUser ?
                    (
                        <div className='user'>
                            <img src={currentUser.avatar || "/noavatar."} alt='avatar' />
                            <span>{currentUser.username}</span>
                            <Link to='/profile' className='profile'>
                                <div className='notification'>3</div>
                                <span>Profile</span>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <a href='/login'>sign in</a>
                            <a className='register' href='/register'>sign up</a>
                        </>
                    )}
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
