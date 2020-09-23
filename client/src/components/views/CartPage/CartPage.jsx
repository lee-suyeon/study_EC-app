import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';

function CartPage({ user }) {
  const dispatch = useDispatch();

  useEffect(() => {

    let cartItems = [];

    // 리덕스 user state에  cart정보가 있는지 확인한다. 
    if(user.userData && user.userData.cart){
      if(user.userData.cart.length > 0){
        user.userData.cart.forEach(item => {
          cartItems.push(item.id)
        })
        dispatch(getCartItems(cartItems, user.userData.cart));
      }
    }
  }, [user.userData])

  return (
    <div>
      CartPage
    </div>
  )
}

export default CartPage