import { useState } from 'react'
import hambuger from "./image/hambuger.jpeg";
import Modal from "./components/Topping";
import "./styled/Topping.css"
import SlideToping from "./components/slideToping"
import Carousel from "react-multi-carousel";

function App() {
  //  모달 열기 
  const [open, setOpen] = useState(false);
  //  토핑 이미지 슬라이드 
  // const responsive = {
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 5
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1
  //   }


  return (
    <>
      <button onClick={() => setOpen(true)}>
        <img src={hambuger} alt='logo image'></img>
        <hambuger />
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
      <div>
      {/* <Modal isOpen={open}> */}
        {/* children */}
        <h2>토핑 선택하기</h2>
        
        {/* <div className="slide"> */}
        {/* <Carousel responsive={responsive}> */}
        <SlideToping />
        {/* </Carousel> */}
        {/* </div> */}
        
        <div className="check-btn">
        <button onClick={() => setOpen(false)} className="btn-yes">확인</button>
        <button onClick={() => setOpen(false)} className="btn-no">취소</button>
        </div>
      </div>
      </Modal>
    </>
  )
}


export default App;
