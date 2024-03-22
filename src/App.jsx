import { useEffect } from "react";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { calculateTotals } from './features/cart/cartSlice';
import { useSelector, useDispatch } from "react-redux";



function App() {
  const {cartItems} = useSelector((store) => store.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])
  return <main>
    <Navbar/>
    <CartContainer/>
  </main>
}
export default App;
