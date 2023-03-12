import React, { useState } from 'react'
import './trending.scss'
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper'
import SwitchTabs from '../../../components/tabs/SwitchTabs'
import useFetch from '../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
const Trending = () => {

  const [endPoint,setEndPonint] = useState("day");
  const {data,loading} = useFetch(`/trending/all/${endPoint}`)
  // console.log('trending',data)

  const onTabChange =(tab)=>{
   setEndPonint(tab==='Day'?'day':'week');
  }
  return (
    <div className='carousel-section'>
      <ContentWrapper>
        <span className="carousel-title">
          Trendings
        </span>
        <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending