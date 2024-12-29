import React from "react";

function MenuList({ menuData, handleMenuClick, setCurrentMenu }) {
  const formatPrice = (price) => {
    if (typeof price !== "number") {
      price = parseFloat(price); // 숫자가 아닌 경우 변환
    }
    return price.toLocaleString("ko-KR");
  };

  // const handleMenuClick = (category) => {
  //   setCurrentMenu(menuData[category]);
  // };
  console.log(menuData);
  return (
    <div>
      <ul>
        {menuData.map((menu) => (
          <li key={menu.id} onClick={() => handleMenuClick(menu)}>
            <img
              src={menu.imgurl}
              alt={menu.name}
              style={{ width: "100px", height: "120px" }}
            />
            <p>{menu.name}</p>
            <p>가격: {formatPrice(menu.price)}원</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuList;
