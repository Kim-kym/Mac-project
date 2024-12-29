import Modal from "./Modal";
import ToppingList from "./ToppingList";
import { useState } from "react";

function SetMenuModal({
  open,
  setOpen,
  selectedItem,
  addToCart,
  sideMenuData,
  drinkMenuData,
  formatPrice,
}) {
  const [sideQuantity, setSideQuantity] = useState({});
  const [drinkQuantity, setDrinkQuantity] = useState({});

  const handleQuantityChange = (setter) => (id, change) => {
    setter((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) + change, 0),
    }));
  };

  const calculateTotalPrice = () => {
    const sidePrice = Object.entries(sideQuantity).reduce((total, [id, qty]) => {
      const side = sideMenuData.find((item) => item.id === parseInt(id));
      return total + (side?.price || 0) * qty;
    }, 0);

    const drinkPrice = Object.entries(drinkQuantity).reduce((total, [id, qty]) => {
      const drink = drinkMenuData.find((item) => item.id === parseInt(id));
      return total + (drink?.price || 0) * qty;
    }, 0);

    return (selectedItem?.price || 0) + sidePrice + drinkPrice;
  };

  const handleAddToCart = () => {
    addToCart({
      ...selectedItem,
      sides: Object.entries(sideQuantity).map(([id, qty]) => ({
        ...sideMenuData.find((item) => item.id === parseInt(id)),
        quantity: qty,
      })),
      drinks: Object.entries(drinkQuantity).map(([id, qty]) => ({
        ...drinkMenuData.find((item) => item.id === parseInt(id)),
        quantity: qty,
      })),
    });
    setOpen(false);
  };

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <div>
        <h3>{selectedItem?.name}</h3>
        <h4>Total Price: {formatPrice(calculateTotalPrice())}원</h4>
        <h4>사이드 메뉴</h4>
        <ToppingList
          productData={sideMenuData}
          quantityMap={sideQuantity}
          handleQuantityChange={handleQuantityChange(setSideQuantity)}
        />
        <h4>음료 선택</h4>
        <ToppingList
          productData={drinkMenuData}
          quantityMap={drinkQuantity}
          handleQuantityChange={handleQuantityChange(setDrinkQuantity)}
        />
        <button onClick={handleAddToCart}>추가</button>
        <button onClick={() => setOpen(false)}>취소</button>
      </div>
    </Modal>
  );
}

export default SetMenuModal;