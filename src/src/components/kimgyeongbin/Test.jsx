import { useLocation } from "react-router-dom";

function Test() {

    const location = useLocation();

    console.log(location)
    const orderOption = location.state.orderOption;

    console.log(orderOption)

    return (
        <div>
        <p>정답이다 연금술사!</p>
        <p>{orderOption}</p>
        </div>
    );
}

export default Test;