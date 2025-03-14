import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './card.scss'
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';


const Card = ({ item }) => {
console.log('item: ', item);
  // const post = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(item.isSaved);
  console.log('savedqq: ', saved);

  const navigate = useNavigate();

  if (!item || !item.images || item.images.length === 0) {
    return <div className="card"></div>;
  }


  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get("/chats/" + id)
      if (!res?.data?.seenBy?.includes(currentUser.id)) {
        decrease()
      }
      setChat({ ...res?.data, receiver })
    } catch (error) {
    }
  }


  const handleSave = async () => {

    setSaved((prev) => !prev);
    if (!currentUser) {

      navigate("/login");
    }

    try {

      await apiRequest.post("/users/save-post", { postId: item.id })

    } catch (error) {
      console.log(error)
      setSaved((prev) => !prev);
    }
  }

  return (
    <div className='card'>
      <Link to={`/${item.id}`} className='imageContainer'>
        <img src={item?.images[0] || ""} alt='image' />
      </Link>
      <div className='textContainer'>
        <h2 className='title'>
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className='address'>
          <img src="/pin.png" alt="image" />
          <span>{item.address}</span>
        </p>
        <p className='price'>${item.price}</p>
        <div className="bottom">
          <div className='features'>
            <div className="feature">
              <img src="/bed.png" alt="image" />
              <span>{item.bedroom} Beds</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="image" />
              <span>{item.bathroom} Bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon " onClick={handleSave} style={{ backgroundColor: saved ? "#fece51" : "white" }}>
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card