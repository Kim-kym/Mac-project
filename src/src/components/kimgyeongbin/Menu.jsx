import Category from "../../components/menu/Category";
import logo from "/image/logo1.jpg";
import "../../styled/mainHome.css";
import { useState } from "react";
// import BurgerSetMenuList from "../../components/menu/burgerSetMenuList";
import CartList from "../../components/cart/cartList";

function App() {
  //메뉴 목록 리스트
  const [burgerSetMenuList] = useState([
    {
      id: 401,
      name: "게살버거 세트",
      price: 11000,
      allergy: "갑각류, 마늘",
      imgurl: "/image/buger/buger1.jpg",
    },

    {
      id: 402,
      name: "불고기 버거 세트",
      price: 9500,
      allergy: "마늘",
      imgurl: "/image/buger/buger2.jpg",
    },

    {
      id: 403,
      name: "치킨버거 세트",
      price: 11500,
      allergy: "닭, 마늘",
      imgurl: "/image/buger/buger3.jpg",
    },

    {
      id: 404,
      name: "쉬림프버거 세트",
      price: 11500,
      allergy: "새우, 마늘",
      imgurl: "/image/buger/buger4.jpg",
    },

    {
      id: 405,
      name: "치즈 버거 세트",
      price: 9500,
      allergy: "유제품",
      imgurl: "/image/buger/buger5.jpg",
    },

    {
      id: 406,
      name: "머쉬룸 버거 세트",
      price: 11500,
      allergy: "마늘",
      imgurl: "/image/buger/buger6.jpg",
    },

    {
      id: 407,
      name: "핫치킨 버거 세트",
      price: 10800,
      allergy: "마늘, 닭",
      imgurl: "/image/buger/buger7.jpg",
    },

    {
      id: 408,
      name: "라이스 버거 세트",
      price: 9900,
      allergy: "마늘",
      imgurl: "/image/buger/buger8.jpg",
    },

    {
      id: 409,
      name: "더블치즈 버거 세트",
      price: 9000,
      allergy: "마늘, 유제품",
      imgurl: "/image/buger/buger9.jpg",
    },
    {
      id: 410,
      name: "오징어 버거 세트",
      price: 10800,
      allergy: "마늘, 해산물, 오징어",
      imgurl: "/image/buger/buger10.jpg",
    },
    {
      id: 411,
      name: "트러플치즈 버거 세트",
      price: 12700,
      allergy: "마늘",
      imgurl: "/image/buger/buger11.jpg",
    },

    {
      id: 412,
      name: "돈까스 버거 세트",
      price: 11800,
      allergy: "마늘",
      imgurl: "/image/buger/buger12.jpg",
    },
  ]);

  const [currentMenu, setCurrentMenu] = useState("burger"); // 초기 메뉴는 'burger'

  // 장바구니 상태 관리
  const [cart, setCart] = useState([]);

  // 장바구니에 항목 추가
  const addToCart = (item) => {
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
      setCart([...cart, { ...item, quantity: 1 }]);
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

  return (
    <div>
      <h1>
        <img src={logo} alt="Krusty Krab Logo" style={{ width: "150px" }} />
        Krusty Krab
      </h1>
      <main>
        <div className="category">
          {/* 카테고리 선택창 */}
          <Category setCurrentMenu={setCurrentMenu} />
        </div>
        {/* 장바구니 리스트 */}
        <CartList
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />

        {/* 조건부 렌더링 */}
        <div id="menu">
          {/* 버거 세트 메뉴 리스트 */}
          {currentMenu === "burgerSetMenuList" && (
            <BurgerSetMenuList
              burgerSetMenuList={burgerSetMenuList}
              addToCart={addToCart}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
