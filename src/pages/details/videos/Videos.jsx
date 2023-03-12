import React, { useState } from "react";

import "./video.scss";

import ContentWrapper from "../../../components/contentwrapper/ContentWrapper";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/popup/Vpopup";
import Img from "../../../components/lazyloadImg/Img";

const Videos = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                       {data?.results?.map((video)=>(
                        <div className="videoItem" key={video.id} onClick={()=>{
                            setVideoId(video.id);
                            setShow(true);
                        }}>
                            <div className="videoThumbnail">
                                <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} alt='dd' />
                                <PlayIcon/>
                            </div>
                            <div className="videoTitle">
                                {video?.name || video?.title}
                            </div>
                        </div>
                       ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default Videos