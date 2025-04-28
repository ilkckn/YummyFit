import Slider from "react-slick";

function YummySlider(cards) {
  // Slider settings
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true
    };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {cards?.map((card, index) => (
          <div key={index} className="slider-card">
            <img src={card.image} alt={card.title} className="slider-image" />
            <h3 className="slider-title">{card.title}</h3>
            <p className="slider-description">{card.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default YummySlider