import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function YummySlider({foodList}) {
  // Slider settings
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
    };

  return (
    <div className="slider-container w-[100%] mx-auto">
      <Slider {...settings}>
        {foodList?.map((food, index) => (
          <div key={index} 
            className="slider-card mb-[10px] border-1 border-[#7fcfb054] shadow-[-1px_0px_5px_rgba(183,211,198,0.8)]">
            <img src={food.image} alt={food.title} 
              className="slider-image rounded-lg mx-auto" />
              <div className="slider-content flex items-center justify-center">
                <h3 className="slider-title text-center">{food.title}</h3>
              </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default YummySlider