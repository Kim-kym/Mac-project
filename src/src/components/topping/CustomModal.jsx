import Modal from "./Modal";
import ToppingList from "./ToppingList";
import { useState, useEffect } from "react";
import BurgerSetMenuData from "../menu/BurgerSetMenuData";

function CustomModal({ formatPrice, open, setOpen, selectedItem, addToCart }) {
  const [selectedMenu, setSelectedMenu] = useState(selectedItem || {});
  const [quantityMap, setQuantityMap] = useState({});
  const [isSetMenuSelected, setIsSetMenuSelected] = useState(false);

  const setMenu = selectedItem?.setMenuId 
    ? BurgerSetMenuData.find((set) => set.id === selectedItem.setMenuId)
    : null;

  useEffect(() => {
    if (selectedItem) {
      setSelectedMenu(selectedItem);
      setQuantityMap({});
      setIsSetMenuSelected(false);
    }
  }, [selectedItem]);

  const handleQuantityChange = (id, change) => {
    setQuantityMap((prevMap) => ({
      ...prevMap,
      [id]: Math.max((prevMap[id] || 0) + change, 0),
    }));
  };

  const handleMenuToggle = () => {
    if (!setMenu) return; // 세트 메뉴가 없는 경우 아무 작업도 하지 않음
    if (selectedMenu === setMenu) {
      // 세트 메뉴 → 단품 메뉴 전환
      setSelectedMenu(selectedItem);
      setIsSetMenuSelected(false);
    } else {
      // 단품 메뉴 → 세트 메뉴 전환
      setSelectedMenu(setMenu);
      setIsSetMenuSelected(true);
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = selectedMenu?.price || selectedItem?.price || 0;
    return Object.entries(quantityMap).reduce((total, [id, quantity]) => {
      const topping = productData.find((item) => item.id === parseInt(id));
      return total + (topping?.price || 0) * quantity;
    }, basePrice);
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...selectedMenu,
      toppings: Object.entries(quantityMap)
        .filter(([_, quantity]) => quantity > 0)
        .map(([id, quantity]) => ({
          ...productData.find((item) => item.id === parseInt(id)),
          quantity,
        })),
    };
    addToCart(cartItem);
    setOpen(false);
  };

  const productData = [
    { id: 901, imageurl: "/image/topping/cheese.jpg", name: "치즈", price: 600 },
    { id: 902, imageurl: "/image/topping/cabbage.png", name: "양배추", price: 600 },
    { id: 903, imageurl: "/image/topping/patty.jpg", name: "패티", price: 600 },
    { id: 904, imageurl: "/image/topping/bacon.jpg", name: "베이컨", price: 600 },
    { id: 905, imageurl: "/image/topping/ketchup.jpg", name: "케첩", price: 600 },
    { id: 906, imageurl: "/image/topping/mustard.jpg", name: "머스타드", price: 600 },
    { id: 907, imageurl: "/image/topping/mayonnaise.jpg", name: "마요네즈", price: 600 },
  ];

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <div>
        {/* 선택한 메뉴 정보: 이미지, 이름, 알레르기, 가격 */}
        {selectedMenu && (
          <div className="selected-menu">
            <img
              src={selectedMenu.imgurl}
              alt={selectedMenu.name}
              onClick={handleMenuToggle}
              style={{
                width: "150px",
                height: "150px",
                marginRight: "20px",
                cursor: "pointer",
              }}
            />
            <div>
              <h3>{selectedMenu.name}</h3>
              <p>알레르기: {selectedMenu.allergy || "없음"}</p>
              <p>가격: {formatPrice(selectedMenu.price)}원</p>
              <p>
                {isSetMenuSelected ? "현재: 세트 메뉴" : "현재: 단품 메뉴"}
              </p>
            </div>
          </div>
        )}
        <h3>Total Price: {formatPrice(calculateTotalPrice())}원</h3>
        <ToppingList
          productData={productData}
          quantityMap={quantityMap}
          handleQuantityChange={handleQuantityChange}
        />
        <div className="actions">
          <button onClick={handleAddToCart}>추가</button>
          <button onClick={() => setOpen(false)}>취소</button>
        </div>
      </div>
    </Modal>
  );
}

export default CustomModal;