import "../../styled/slideTopping.css";
export default function SlideToping({
  item,
  quantityMap,
  handleQuantityChange,
}) {
  return (
    
    <div className="card">
      {/* <button> */}
      <img className="product" src={item.imageurl} alt="product image"></img>
      <h2>{item.name}</h2>
      <p className="price">{item.price}</p>
      {/* </button> */}
      <div className="count-btn">
        <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
        <span>{quantityMap[item.id] || 0}</span>
        <button onClick={() => handleQuantityChange(item.id, +1)}>+</button>
      </div>
    </div>
    // {/* </Carousel> */}
  );
}
