import React from 'react'
import './home.scss'
import Hero from './banner/Hero'
import Trending from './trandings/Trending'
import Popular from './popular/Popular'
import TopRated from './toprated/TopRated'
const Home = () => {
  return (
    <div className='home'>
      <Hero/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Home