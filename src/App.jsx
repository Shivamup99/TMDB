import { useEffect, useState } from 'react'
import {fetchApiData} from './utils/api';
import {createBrowserRouter , Outlet, RouterProvider} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration,getGenres } from './redux/slice/homeSlice';
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import Header from './components/navbar/Header'
import Footer from './components/footer/Footer'
import SearchResult from './pages/search/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
function App() {

  const Layout = ()=>{
    return(
      <>
      <Header/>
      <Outlet/>
      <Footer/>
      </>
    )
  }

  const dispatch = useDispatch();
  const {url} = useSelector((state) => state.home)
  useEffect(()=>{
    fetchApiConfiguration();
    fetchGenresCall();
  },[])

  const fetchApiConfiguration =()=>{
    //for getting the path of config images and original is size cheking by network tab
    fetchApiData('/configuration').then((res)=>{
      const url ={
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url))
    })
  }

  const fetchGenresCall = async()=>{
    let promises =[];
    let endPoint = ['tv','movie'];
    let allGenres ={};
    endPoint.forEach((url)=>{
      promises.push(fetchApiData(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    // console.log(data);
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id]=item))
    })
    dispatch(getGenres(allGenres));
  }

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/:mediaType/:id',
          element:<Details/>
        },
        {
          path:'/search/:query',
          element:<SearchResult/>
        },
        {
          path:'/explore/:mediaType',
          element:<Explore/>
        },
        {
          path:'*',
          element:<PageNotFound/>
        }
      ]
    }
  ])

  return (
    <div className="app">
    <RouterProvider router={router}></RouterProvider>
   </div>
  )
}

export default App
