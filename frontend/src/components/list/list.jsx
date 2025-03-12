import React from 'react'
import Card from '../card/card'
import './list.scss'

const List = ({posts}) => {
// console.log('posts: ', posts)
    return (
        <div className='list'>
            {
                posts?.map((item) => (
                    <Card item={item} key={item.id} />
                ))
            }
        </div>
    )
}

export default List