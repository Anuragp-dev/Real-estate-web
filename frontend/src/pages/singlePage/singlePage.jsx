import React, { useContext, useState } from 'react'
import './singlePage.scss'
import Slider from '../../components/slider/slider'
import { singlePostData, userData } from '../../lib/dummydata'
import Map from '../../components/map/map'
import { Await, useLoaderData, useNavigate } from 'react-router-dom'
import DOMpurify from 'dompurify'
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';
import { useNotificationStore } from '../../lib/notificationStore'
import { Suspense } from 'react'
import Chat from '../../components/chat/chat'

const SinglePage = () => {
  const post = useLoaderData();
  console.log('post: ', post);
  const [chat, setChat] = React.useState(null)
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(post?.isSaved);
  const decrease = useNotificationStore((state) => state.decrease);
  const [isChat, setIsChat] = useState(null)
  // console.log('saved: ', saved);


  const navigate = useNavigate();

  const handleSave = async () => {

    if (!currentUser) {

      navigate("/login");
    }

    setSaved((prev) => !prev);

    try {

      await apiRequest.post("/users/save-post", { postId: post.postResponse.id })

    } catch (error) {
      console.log(error)
      setSaved((prev) => !prev);
    }
  }


  const handleOpenChat = async (receiverId) => {

    try {
      const res = await apiRequest.post("/chats/add-chat", { receiverId: receiverId })
      // console.log('res: ', res);


      const getChat = await apiRequest.get("/chats/" + res?.data?.id)
      // console.log('getChat: ', getChat);
      setIsChat({ ...getChat?.data })
      if (!getChat?.data?.seenBy?.includes(currentUser.id)) {
        decrease()
      }


      // if (!res?.data?.seenBy?.includes(currentUser.id)) {
      //   decrease()
      // }
      // setChat({ ...res?.data, receiver })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='singlePage'>
      <div className="details">
        <div className="wrapper">
          <Slider images={post?.postResponse.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post?.postResponse.address}</span>
                </div>
                <div className="price">
                  ${post?.postResponse?.price}
                </div>
              </div>
              <div className="user">
                <img src={post.postResponse.user.avatar} alt="" />
                <span>{post.postResponse.user.username}</span>
              </div>
            </div>
            <div className="bottom"
              dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(post.postResponse.PostDetail.desc) }}
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

                {post.postResponse.PostDetail.utilities === "owner" ? (
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
                {post.postResponse.PostDetail.pets === "allowed" ? (
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
                <p>{post.postResponse.PostDetail.income}</p>
              </div>
            </div>
          </div>
          <p className='title'>Sizes </p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postResponse.PostDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.postResponse.bedroom}beds</span>
            </div>

            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.postResponse.bathroom} bathroom</span>
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
                <p>{post.postResponse.PostDetail.school > 999 ? post.postResponse.PostDetail.school / 1000 + "km" : post.postResponse.PostDetail.school + "m"} away</p>

              </div>
            </div>
            <div className="feature">
              <img src="/restaurant.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postResponse.PostDetail.restaurant}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/bus.png" alt="" />
              <div className="featureText">
                <span>Bus stop</span>
                <p>{post.postResponse.PostDetail.bus}m away</p>
              </div>

            </div>
          </div>
          <p className='title'>Location</p>
          <div className='mapContainer'>
            <Map items={[post.postResponse]} />
          </div>
          <div className="buttons">
            <button onClick={() => handleOpenChat(post.postResponse.userId)}>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={handleSave} style={{ backgroundColor: saved ? "#fece51" : "white" }}>
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
{
  isChat &&
          <Chat chats={isChat} chatId={isChat?.id} receiverId={post.postResponse.userId}  isMessage={false} />
}
          {/* <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={isChat}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse} chatId={chatResponse?.id} receiverId={post.postResponse.userId}  isMessage={false} />}
            </Await>
          </Suspense> */}
        </div>
      </div>
    </div>
  )
}

export default SinglePage
