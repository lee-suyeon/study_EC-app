import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import Paypal from '../../utils/Paypal';
import { Empty } from 'antd';

function CartPage({ user }) {
  const dispatch = useDispatch();
  const [ total, setTotal ] = useState('');
  const [ showTotal, setShowTotal ] = useState(false);

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
    setShowTotal(true);
  }

  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId))
      .then(response => {
        if(response.payload.productInfo.length <= 0){
          setShowTotal(false);
        }
      });
  }

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock 
          products={user.cartDetail && user.cartDetail}
          removeItem={removeFromCart}  
        />
      </div>

      {showTotal ?
        <div style={{ maginTop: '3rem' }}>
          <h2>Total Amout: ${total}</h2>
        </div>
      : <Empty description={false} style={{ marginTop: '1.5rem' }}/>}
      {showTotal && 
        <Paypal 
          total={total}
        />
      }
    </div>
  )
}

export default CartPage