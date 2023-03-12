import React from "react";
import { useSelector } from "react-redux";

import "./cast.scss";

import ContentWrapper from "../contentwrapper/ContentWrapper";
import Img from "../lazyloadImg/Img";
import avatar from "../../assets/images/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    //  console.log(url)
    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                       {data?.map((item)=>{
                        //  console.log(url.profile+item.profile_path)
                        return(
                           
                            <div key={item.id} className="listItem">
                              <div className="profileImg">
                              <Img  src={url.profile + item?.profile_path} alt='namw' />
                              </div>
                              <div className="name">
                                {item?.name}
                              </div>
                              <div className="character">
                                {item?.character}
                              </div>
                            </div>
                        )
                       })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
