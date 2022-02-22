import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import Styles from "./HeaderCartButton.module.css";
import { useContext,useEffect,useState } from "react";

const HeaderButton = (props) => {
  const cartCtx = useContext(CartContext);
  const numberOfItems = cartCtx.items.reduce((cur, item) => {
    return cur + item.amount;
  }, 0);
  const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);
  const btnStyles = `${Styles.button} ${btnIsHighlighted ? Styles.bump:''}`;
  useEffect(() => { 
    if (cartCtx.items.length === 0)
      return;
    setBtnIsHighlighted(true);

   const timer = setTimeout(() => { 
      setBtnIsHighlighted(false);
    }, 300)
    return () => { 
      clearTimeout(timer);
    }
  },[cartCtx.items]);
  return (
    <button className={btnStyles} onClick={props.onClick}>
      <span className={Styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={Styles.badge}>{numberOfItems}</span>
    </button>
  );
};
export default HeaderButton;
