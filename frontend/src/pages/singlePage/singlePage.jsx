import React, { useContext } from 'react'
import './singlePage.scss'
import Slider from '../../components/slider/slider'
import { singlePostData, userData } from '../../lib/dummydata'
import Map from '../../components/map/map'
import { useLoaderData, useNavigate } from 'react-router-dom'
import DOMpurify from 'dompurify'
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

const SinglePage = () => {
  const post = useLoaderData();
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSave = async () => {

    if (!currentUser) {

      navigate("/login");
    }

    try {

      await apiRequest.post("/users/save-post", { postId: post.id })

    } catch (error) {

    }
  }

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
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom"
              dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(post.PostDetail.desc) }}
            >
              {/* {post.desc} */}
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
                {post.PostDetail.pets === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets Not Allowed</p>
                )}
              </div>
            </div>

            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.PostDetail.income}</p>
              </div>
            </div>
          </div>
          <p className='title'>Sizes </p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.PostDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom}beds</span>
            </div>

            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>

            {/* <div className="size">
              <img src="/bath.png" alt="" />
              <span>90 sqft</span>
            </div> */}
          </div>

          <p className='title'>Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.PostDetail.school > 999 ? post.PostDetail.school / 1000 + "km" : post.PostDetail.school + "m"} away</p>

              </div>
            </div>
            <div className="feature">
              <img src="/restaurant.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.PostDetail.restaurant}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/bus.png" alt="" />
              <div className="featureText">
                <span>Bus stop</span>
                <p>{post.PostDetail.bus}m away</p>
              </div>

            </div>
          </div>
          <p className='title'>Location</p>
          <div className='mapContainer'>
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={handleSave}>
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
