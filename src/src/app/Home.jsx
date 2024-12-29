function Home() {
  let orderOption = "";

  const orderOptionSelect = (option) => {
    orderOption = option;
    console.log(orderOption);
  };

  const getOrderoption = () => {
    return orderOption.current;
  };

  return (
    <div style={{ backgroundColor: "green" }}>
      <div
        style={{ backgroundColor: "green", height: "40vw", fontSize: "10vw" }}
      ></div>

      <div>
        <button
          style={{
            width: "47vw",
            height: "45vw",
            marginRight: "1vw",
            marginLeft: "1.7vw",
          }}
          onClick={() => orderOptionSelect("포장")}
        >
          포장
        </button>

        <button
          style={{ width: "47vw", height: "45vw" }}
          onClick={() => orderOptionSelect("매장")}
        >
          매장
        </button>
      </div>
    </div>
  );
}

export default Home;
