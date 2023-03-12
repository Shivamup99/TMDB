import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Img from "../../../components/lazyloadImg/Img";
import ContentWrapper from "../../../components/contentwrapper/ContentWrapper";
import "./hero.scss";

const Hero = () => {
  const navigate = useNavigate();
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    // url.backdrop is just add for image path from tmdb api
    const bgImg =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bgImg);
  }, [data]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="hero">
      {!loading && (
        <div className="back-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="hero-content">
          <span className="title">Welcome.</span>
          <span className="sub-title">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchBox">
            <input
              type="text"
              onKeyUp={handleSearch}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie, tv show, person....."
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Hero;
