import Category from "../components/menu/Category";
import logo from "/image/logo1.jpg";
import "../styled/MainHome.css";
import { useState } from "react";
import CartList from "../components/cart/cartList";
import MenuDisplay from "../components/menu/MenuDisplay";
import Modal from "./Modal";
import BurgerSetMenuData from "../components/menu/BurgerSetMenuData";
import BurgerMenuData from "../components/menu/BurgerMenuData";
import CoffeeMenuData from "../components/menu/CoffeeMenuData";
import DrinkMenuData from "../components/menu/DrinkMenuData";
import SideMenuData from "../components/menu/SideMenuData";
import CustomModal from "../components/topping/CustomModal"
import SetMenuModal from "../components/topping/SetMenuModal";
// import menuListData from "../components/menu/MenuList";

function MainHome() {
  const [currentMenu, setCurrentMenu] = useState("burger"); // 초기 메뉴는 'burger'

  // 선택한 메뉴 정보 불러오기
  const handleMenuClick = (menu) => {
    console.log("Clicked menu:", menu);
    if (!menu || !menu.category) {
      console.error("Invalid menu item clicked. Menu:", menu);
      return;
    }
    if (menu.category === "burger" || menu.category === "Set") {
      //  버거와 세트 메뉴만 모달창 열기 
      setSelectedItem(menu);
      setOpen(true);
      console.log("Opeing modal for:", menu);
    } else {
      console.log("Adding to cart directly:", menu);
      //  사이드 메뉴, 음료, 커피는 바로 장바구니에 담기 
      addToCart({ ...menu, quantity: 1 });
    }
  };

  const menuDatas = {
    Set: BurgerSetMenuData,
    burger: BurgerMenuData,
    drink: DrinkMenuData,
    coffee: CoffeeMenuData,
    side: SideMenuData,
  };

  // 장바구니 상태 관리
  const [cart, setCart] = useState([]);

  // 장바구니 열림/닫힘 상태
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 장바구니에 항목 추가
  const addToCart = (item) => {
    console.log("Adding to cart:", item);
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // 이미 장바구니에 있으면 수량만 증가
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // 처음 장바구니에 추가하는 경우
      setCart([...cart, { ...item, quantity: 1, price: item.price || 0, category: item.category || "기타" }]);
    }
  };

  // 장바구니에서 항목 삭제
  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  // 장바구니 항목 수량 수정
  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return; // 수량이 1보다 적을 수 없도록
    setCart(
      cart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };
  // 메뉴 가격
  const formatPrice = (price) => price.toLocaleString("ko-KR");

  //  모달 상태 관리
  const [open, setOpen] = useState(false);

  // 선택된 메뉴 아이템 저장
  const [selectedItem, setSelectedItem] = useState(null);

  // 선택된 토핑 저장
  const [selectedTopping, setSelectedTopping] = useState(null);

  return (
    <div>
      <div className="back"></div>
      <h1>
        <img src={logo} alt="Krusty Krab Logo" style={{ width: "150px" }} />
        Krusty Krab
      </h1>
      <main>
        <div className="category">
          <MenuDisplay
            currentMenu={currentMenu}
            setCurrentMenu={setCurrentMenu}
            addToCart={addToCart}
            handleMenuClick={handleMenuClick}
            menuListData={menuDatas}
          />
        </div>
        {/* 장바구니 리스트 */}

        <div
          className={`cart-container ${isCartOpen ? "open" : ""}`}
          onClick={() => setIsCartOpen(!isCartOpen)} // 장바구니 열기/닫기
        ></div>
        <CartList
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
       {selectedItem?.category === "burger" && (
  <CustomModal
    open={open}
    setOpen={setOpen}
    selectedItem={selectedItem}
    addToCart={addToCart}
    selectedTopping={selectedTopping}
    setSelectedTopping={setSelectedTopping}
    formatPrice={formatPrice}
  />
)}

{selectedItem?.category === "Set" && (
  <SetMenuModal
    open={open}
    setOpen={setOpen}
    selectedItem={selectedItem}
    addToCart={addToCart}
    formatPrice={formatPrice}
    sideMenuData={menuDatas.side}
    drinkMenuData={menuDatas.drink}
  />
)}

      </main>
    </div>
  );
}

export default MainHome;
