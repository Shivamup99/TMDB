import React, { useState } from 'react'
import './popular.scss'
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper'
import SwitchTabs from '../../../components/tabs/SwitchTabs'
import useFetch from '../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
const Popular = () => {

  const [endPoint,setEndPonint] = useState("movie");
  const {data,loading} = useFetch(`/${endPoint}/popular`)
  // console.log('trending',data)

  const onTabChange =(tab)=>{
   setEndPonint(tab==='Movies'?'movie':'tv');
  }
  return (
    <div className='carousel-section'>
      <ContentWrapper>
        <span className="carousel-title">
          What's Popular
        </span>
        <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>
    </div>
  )
}

export default Popular