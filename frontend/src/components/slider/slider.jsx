import React from 'react'
import './slider.scss'

const Slider = ({ images }) => {
    const [imageIndex, setImageIndex] = React.useState(null)

    const changeSlider = (direction) => {
        if (direction === "left") {
            setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1)
        } else {
            setImageIndex(imageIndex === images.length - 1 ? 0 : imageIndex + 1)
        }
    }
    return (
        <div className='slider'>
            {imageIndex !== null && <div className="fullSlider">
                <div className="arrow">
                    <img src="/arrow.png" alt="" onClick={() => changeSlider("left")} />
                </div>
                <div className="imageContainer">
                    <img src={images[imageIndex]} alt="image" />
                </div>
                <div className="arrow">
                    <img src="/arrow.png" className='right' alt="" onClick={() => changeSlider("right")} />
                </div>
                <div className="close" onClick={() => setImageIndex(null)}>x</div>
            </div>
            }
            <div className='bigImage'>
                <img src={images[0]} alt="image" onClick={() => setImageIndex(0)} />
            </div>
            <div className="smallImage">
                {images.slice(1).map((image, index) => (
                    <img src={image} alt="image" key={index} onClick={() => setImageIndex(index + 1)} />
                ))}
            </div>

        </div>
    )
}

export default Slider