import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';

function CartPage({ user }) {
  const dispatch = useDispatch();
  const [ total, setTotal ] = useState('');

  useEffect(() => {

    let cartItems = [];

    // 리덕스 user state에  cart정보가 있는지 확인한다. 
    if(user.userData && user.userData.cart){
      if(user.userData.cart.length > 0){
        user.userData.cart.forEach(item => {
          cartItems.push(item.id)
        })
        dispatch(getCartItems(cartItems, user.userData.cart))
          .then(response => { calculateTotal(response.payload) })
      }
    }
  }, [user.userData])

  let calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.map(item => {
      total += parseInt(item.price, 10) * item.quantity
    });
    setTotal(total);
  }

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock products={user.cartDetail && user.cartDetail}/>
      </div>

      <div style={{ maginTop: '3rem' }}>
        <h2>Total Amout: ${total}</h2>
      </div>
    </div>
  )
}

export default CartPage