import React from 'react'
import Card from '../card/card'
import './list.scss'
import { listData } from '../../lib/dummydata'

const List = () => {
    return (
        <div className='list'>
            {
                listData.map((item) => (
                    <Card item={item} key={item.id} />
                ))
            }
        </div>
    )
}

export default List