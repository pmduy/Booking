import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Banner.scss";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerAction } from "store/action/movieActions";


export default function Banner() {
  const dispatch = useDispatch();
  const { Banner, isLoading } = useSelector(state => state.movieReducer);
  useEffect(() => {
    dispatch(fetchBannerAction());
  }, []);


  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    marginRight: 20,
  };
  if (isLoading)
    return <Loader type="Bars" color="#ecd60f" height={80} width={80} style={{display:"flex",justifyContent:"center",height:'300px',alignItems: "center"}}/>
  return (
    <div>
      <section className="banner">
        <Slider {...settings}>{Banner?.map((banner, index) => {
          return (
            <div key={index}>
              <img src={banner.hinhAnh}></img>
            </div>
          )
        })} </Slider>
      </section>
    </div>
  )
}


