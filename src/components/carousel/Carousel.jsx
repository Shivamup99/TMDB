import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentwrapper/ContentWrapper";
import Img from "../lazyloadImg/Img";
import PosterFallback from "../../assets/images/no-poster.png";
import './carousel.scss'
import CircleRating from "../rating/CircleRating";
import Genres from "../genres/Genres";
const Carousel = ({data,loading,endPoint,title}) => {
    const carouselContainer = useRef();
    const {url} = useSelector((state)=>state.home);
    const navigate = useNavigate();
    const navigation =(direction)=>{
      const container = carouselContainer.current
      let scrollAmount = direction==='left' ? container.scrollLeft - (container.offsetWidth +20):container.scrollLeft + (container.offsetWidth +20)
      container.scrollTo({
        left:scrollAmount,
        behavior:'smooth'
      }) 
    }
    // console.log(url)

    const skItem =()=>{
        return(
            <div className="skeletonItem">
                <div className="posterBlock">
                    <div className="textBlock">
                        <div className="title"></div>
                        <div className="date skeleton"></div>
                    </div>
                </div>
            </div>
        )
    }
  return (
    <div className="carousel">
        <ContentWrapper>
            {title && <div className="carouselTitle">{title}</div>}
            <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={()=>navigation("left")}/>
            <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={()=>navigation("right")}/>
            {!loading ? (
                <div className="carouselItems" ref={carouselContainer}>
                    {data?.map((item)=>{
                        return(
                            <div className="carouselItem" key={item.id} onClick={()=>navigate(`/${item.media_type || endPoint}/${item.id}`)}>
                                <div className="posterBlock">
                                    <Img src={item.poster_path ? url.poster + item.poster_path : PosterFallback} alt={item.title} />
                                    <CircleRating rating = {item.vote_average.toFixed(1)}/>
                                    <Genres data={item.genre_ids.slice(0,2)}/>
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {item.title || item.name}
                                    </span>
                                    <span className="date">
                                        {dayjs(item.release_Date).format(
                                            "MMM D, YYYY"
                                        )}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ):(
               <div className="loadingSkeleton">
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
               </div>
            )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel