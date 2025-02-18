import React from 'react'
import './listPage.scss'
import { listData } from '../../lib/dummydata'
import Filter from '../../components/filter/filter'
import Card from '../../components/card/card'
import Map from '../../components/map/map'
import { useLoaderData } from 'react-router-dom'

const ListPage = () => {

    // const data = listData
    const post = useLoaderData();
    return (
        <div className='listPage'>
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    {post.map((item) => (
                        <Card item={item} key={item.id} />
                    ))}
                </div>
            </div>
            <div className="mapContainer">
                <Map items={post} />
            </div>
        </div>
    )
}

export default ListPage
