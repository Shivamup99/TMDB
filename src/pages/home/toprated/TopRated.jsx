import React, { useState } from 'react'
import './top.scss'
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper'
import SwitchTabs from '../../../components/tabs/SwitchTabs'
import useFetch from '../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
const TopRated = () => {

  const [endPoint,setEndPonint] = useState("movie");
  const {data,loading} = useFetch(`/${endPoint}/top_rated`)
  // console.log('trending',data)

  const onTabChange =(tab)=>{
   setEndPonint(tab==='Movies'?'movie':'tv');
  }
  return (
    <div className='carousel-section'>
      <ContentWrapper>
        <span className="carousel-title">
          Top Rated
        </span>
        <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>
    </div>
  )
}

export default TopRated