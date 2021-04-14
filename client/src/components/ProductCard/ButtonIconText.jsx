import React, { useState } from "react";
import "../../scss/components/ProductCard/_ButtonIconText.scss";
import DivText from "./DivText.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { FormGroup } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { modifyCart, modifyFav } from "../../redux/iconReducer/iconActions";
import { addProduct, deleteProduct } from "../../redux/cartReducer/cartActions";

function ButtonIconText(props) {
  const [state, setState] = useState({
    [`Fav-${props.productId}`]: false,
    [`Cart-${props.productId}`]: false,
  });
  const cartChecked= <ShoppingCartIcon style={{ color: "white" }} />
  const [iconCartChecked, setIconcart] = useState(cartChecked);
  const cart = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();
//const addedCart = cart.filter(product=>product.productId===props.productId ? setIconcart(addedCart))
// addedCart.length!==0 && console.log(addedCart)

  function handleHeart(event) {
    let { name, checked } = event.target;

    setState({ ...state, [name]: checked });
    if (name.includes("Fav")) {
      dispatch(modifyFav({ [name]: checked }));
    } else {
      dispatch(modifyCart({ [name]: checked }));
      if (checked) {
        dispatch(addProduct(props.product));
      } else {
        dispatch(deleteProduct(props.product));
      }
    }
  }

  return (
    <div className="buttonIcon">
      <div className="iconContainer">
        <FormGroup>
          {props.icon === "Heart" ? (
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={state[`Fav-${props.productId}`]}
                  name={`Fav-${props.productId}`}
                  onChange={handleHeart}
                />
              }
            />
          ) : (
            <FormControlLabel
              control={
                <Checkbox
                  icon={<ShoppingCartOutlinedIcon />}
                  checkedIcon={iconCartChecked}
                  name={`Cart-${props.productId}`}
                  onChange={handleHeart}
                />
              }
            />
          )}
        </FormGroup>
      </div>
      <div className="textContainer">
        <DivText
          className="textIcon"
          content={props.icon === "Heart" ? "Add to Favorites" : "Add to Cart"}
        />
      </div>
    </div>
  );
}

export default ButtonIconText;
