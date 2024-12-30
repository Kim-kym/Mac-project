import Category from "../components/menu/Category";
import logo from "/image/logo1.jpg";
import "../styled/MainHome.css";
import { useState } from "react";
import CartList from "../components/cart/cartList";
import MenuDisplay from "../components/menu/MenuDisplay";
// import Modal from "./Modal";
import BurgerSetMenuData from "../components/menu/BurgerSetMenuData";
import BurgerMenuData from "../components/menu/BurgerMenuData";
import CoffeeMenuData from "../components/menu/CoffeeMenuData";
import DrinkMenuData from "../components/menu/DrinkMenuData";
import SideMenuData from "../components/menu/SideMenuData";
import CustomModal from "../components/topping/CustomModal";
import SetMenuModal from "../components/topping/SetMenuModal";
import productMenuData from "../components/menu/ProductMenuData";
import OptionSelectionModal from "../components/topping/OptionSelectionModal";
import "../styled/Modal.css";

// import menuListData from "../components/menu/MenuList";

function MainHome() {
  const [currentMenu, setCurrentMenu] = useState("burger"); // 초기 메뉴는 'burger'

  const handleMenuClick = (menu) => {
    if (menu.category === "burger" || menu.category === "Set") {
      setSelectedItem(menu);
      setOpen(true);
    } else if (menu.name === "양념감자") {
      // 양념감자: 맛 선택 모달
      setModalConfig({
        title: "양념감자 맛 선택",
        options: ["치즈", "양파", "매운맛", "갈릭"],
        selectedOptions: [],
      });
      setOptionModalOpen(true);
    } else if (menu.category === "coffee") {
      // 커피: 아이스/핫 선택 모달
      setModalConfig({
        title: "커피 옵션 선택",
        options: ["아이스", "핫"],
        selectedOptions: [],
      });
      setOptionModalOpen(true);
    } else {
      addToCart(menu); // 다른 메뉴는 바로 장바구니에 추가
    }
  };
    // 옵션 확인 처리 
  const handleOptionConfirm = (selectedOptions) => {
    console.log("선택된 옵션:", selectedOptions);
    // 선택된 옵션을 장바구니에 반영
    addToCart({
      ...selectedItem,
      options: selectedOptions, // 옵션 추가
    });
    setOptionModalOpen(false);
  };

  const menuDatas = {
    Set: BurgerSetMenuData || [],
    burger: BurgerMenuData || [],
    drink: DrinkMenuData || [],
    coffee: CoffeeMenuData || [],
    side: SideMenuData || [],
    product: productMenuData || [],
  };

  const [cart, setCart] = useState([]); // 장바구니 상태 관리
  const [isCartOpen, setIsCartOpen] = useState(false); // 장바구니 열림/닫힘 상태

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
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
          price: item.price || 0,
          category: item.category || "기타",
        },
      ]);
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

   // 옵션 선택 모달 상태
   const [optionModalOpen, setOptionModalOpen] = useState(false);
   const [modalConfig, setModalConfig] = useState({
     title: "",
     options: [],
     selectedOptions: [],
   });
  

  return (
    <div>
      <div className="back"></div>
      <h1>
        <img src={logo} alt="Krusty Krab Logo" style={{ width: "150px" }} />
        Krusty Krab
      </h1>
      <main>
        <div className="category">
          {/* 메뉴 선택창 */}
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
        >
          <span>장바구니</span>
        </div>
        {isCartOpen && (
          <CartList
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        )}

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
            productMenuData={menuDatas.product}
            handleSideSelection={(sideItem) => {
              console.log("Clicked side item:", sideItem)
              if (sideItem.name === "양념감자") {
                setModalConfig({
                  title: "양념감자 맛 선택",
                  options: ["치즈", "양파", "매운맛", "갈릭"],
                  selectedOptions: [],
                });
                setOptionModalOpen(true);
              }
            }}
          />
        )}
        {/* 옵션 선택 모달 */}
        <OptionSelectionModal
          open={optionModalOpen}
          setOpen={setOptionModalOpen}
          title={modalConfig.title}
          options={modalConfig.options}
          selectedOptions={modalConfig.selectedOptions}
          setSelectedOptions={(selected) =>
            setModalConfig((prev) => ({ ...prev, selectedOptions: selected }))
          }
          onConfirm={handleOptionConfirm}
        />
      </main>
    </div>
  );
}

export default MainHome;
