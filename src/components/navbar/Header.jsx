import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import ContentWrapper from "../contentwrapper/ContentWrapper";
import logo from "../../assets/images/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const controlHeader =()=>{
     if(window.scrollY > 200){
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow("hide");
      }else{
        setShow("show");
      }
     } else{
      setShow("top");
     }
     setLastScrollY(window.scrollY);
  }

  useEffect(()=>{
    window.addEventListener("scroll",controlHeader);
    return()=>{
      window.removeEventListener("scroll",controlHeader);
    }
   
  },[lastScrollY])

  const openSearchBox = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const openMobileMenu = () => {
    // window.alert("Mobile")
    setMobileMenu(true);
    setShowSearch(false);
  };

  const handleNavigation=(type)=>{
    if(type==='movie'){
      navigate("/explore/movie");
    } else{
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  }

  useEffect(()=>{
    window.scrollTo(0,0);
  },[location])

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      // setTimeout(() => {
      //   setShowSearch(false);
      // }, 1000);
    }
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="logo" onClick={()=>navigate('/')}/>
        </div>
        <ul className="menu-items">
          <li className="menu-item" onClick={()=>handleNavigation("movie")}>Movies</li>
          <li className="menu-item" onClick={()=>handleNavigation("tv")}>TvShows</li>
          {/* <li className="menu-item">
            <HiOutlineSearch onClick={openSearchBox}/>
          </li> */}
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearchBox} />
          {mobileMenu ? (
            <VscChromeClose onClick={setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <input
              type="text"
              onKeyUp={handleSearch}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie, tv show, person....."
            />
            <VscChromeClose onClick={setShowSearch(false)} />
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
