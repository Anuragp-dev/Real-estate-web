import React from 'react'
import "./HomePage.scss"
import SearchBar from '../../components/searchBar/SearchBar'


const HomePage = () => {
    return (
        <div className='homePage'>
            <div className='textContainer'>
                <div className="wrapper">
                    <h1 className="title">
                        Find Real Estate & Get Your Dream Place
                    </h1>
                    <p className=''>
                        Your trusted destination for finding the perfect home.
                        Whether you're buying, selling, or renting,
                        we are here to guide you every step of the way.
                        Explore a wide range of properties tailored to your needs,
                        from cozy apartments to luxurious homes in your dream locations.
                        With our user-friendly platform, personalized service,
                        and expert advice,
                    </p>
                    <SearchBar />
                    <div className="box">
                        <h1>16+</h1>
                        <h2>Years of Experience</h2>
                    </div>
                    <div className="box">
                        <h1>200+</h1>
                        <h2>Award gained</h2>
                    </div>
                    <div className="box">
                        <h1>1200+</h1>
                        <h2>Property Ready</h2>
                    </div>
                </div>
            </div>
            <div className='imgContainer'>
                <img src="/bg.png" alt="background" />
            </div>
        </div>
    )
}

export default HomePage
