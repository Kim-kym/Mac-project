import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import cheese from "../image/cheese.jpg";
import "../styled/slideToping.css";

export default function SlideToping() {
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };



  return (
    <div className="SlideTopping">
        <h3>토핑 추가</h3>
  <Carousel responsive={responsive}>
    <div className="card">
        <img className="product"
        src={cheese} alt ="product image">
        </img>
        <h2>치즈</h2>
        <p className="price">+600원</p>
        <div className="count-btn">
            <button className="btn-plus">+</button>
            <p> +1 </p>            
            <button className="btn-minus">--</button>
        </div>
    </div>
    <div className="card">
        <img className="product"
        src={cheese} alt ="product image">
        </img>
        <h2>치즈</h2>
        <p className="price">+600원</p>
        <div className="count-btn">
            <button className="btn-plus">+</button>            
            <button className="btn-minus">--</button>
        </div>
    </div>
    <div>Item 3</div>
    <div>Item 4</div>
  </Carousel>
  </div>
  );
}
