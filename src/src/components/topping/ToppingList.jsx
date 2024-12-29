import SlideTopping from "./toppingslide";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ToppingList = ({ productData, quantityMap, handleQuantityChange }) => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
    desktop: { breakpoint: { max: 1024, min: 800 }, items: 3 },
    tablet: { breakpoint: { max: 800, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <Carousel responsive={responsive}>
      {productData.map((item) => (
        <SlideTopping
          key={item.id}
          item={item}
          quantityMap={quantityMap}
          handleQuantityChange={handleQuantityChange}
        />
      ))}
    </Carousel>
  );
};

export default ToppingList;