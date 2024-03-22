import React from 'react'
import { ChevronDown, ChevronUp } from '../icons';
import { removeItem, increase, decrease } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({ id, img, title, price, amount }) => {
  const despatch = useDispatch()
  // console.log(title, price, img, amount);
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button className='remove-btn'
          onClick={() => despatch(removeItem(id))}
        >remove</button>
      </div>
      <div>
        <button className='amount-btn'
          onClick={() => despatch(increase({id}))}
        >
          <ChevronUp />
        </button>
        <p className='amount'>{amount}</p>
        <button className='amount-btn'
          onClick={() =>{
            if (amount === 1){
              despatch(removeItem(id));
              return;
            }
            despatch(decrease({id}))
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  )
}

export default CartItem