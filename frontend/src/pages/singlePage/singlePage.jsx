import React from 'react'
import './singlePage.scss'
import Slider from '../../components/slider/slider'
import { singlePostData, userData } from '../../lib/dummydata'
import Map from '../../components/map/map'
import { useLoaderData } from 'react-router-dom'

const SinglePage = () => {
  const post = useLoaderData();
  return (
    <div className='singlePage'>
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">
                  ${post.price}
                </div>
              </div>
              <div className="user">
                <img src={post.user.img} alt="" />
                <span>{post.user.name}</span>
              </div>
            </div>
            <div className="bottom">
              {post.description}
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className='title'> General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>

                {post.PostDetail.utilities === "owner" ? (
                  <p>owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>

            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pets Allowed</p>
              </div>
            </div>

            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className='title'>Sizes </p>
          <div className="sizes">
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>2 Beds</span>
            </div>

            <div className="size">
              <img src="/bath.png" alt="" />
              <span>2 bathroom</span>
            </div>

            <div className="size">
              <img src="/bath.png" alt="" />
              <span>90 sqft</span>
            </div>
          </div>

          <p className='title'>Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>Shop</span>
                <p>250m away</p>

              </div>
            </div>
            <div className="feature">
              <img src="/restaurant.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/bus.png" alt="" />
              <div className="featureText">
                <span>Bus stop</span>
                <p>100m away</p>
              </div>

            </div>
          </div>
          <p className='title'>Location</p>
          <div className='mapContainer'>
            <Map items={[singlePostData]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button>
              <img src="/save.png" alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePage
